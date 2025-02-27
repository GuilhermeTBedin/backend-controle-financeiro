const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    if (!password) {
      return res.status(400).json({ message: "A senha é obrigatória" });
    }    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).json({ message: "Credenciais inválidas" });
    }

    //Gerar Access Token(expira rápido 15 minutos)
    const accessToken = `Bearer ${jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" })}`;

    //Gerar o Refresh Token(expira em 7 dias)
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    await RefreshToken.create({ token: refreshToken, userId: user._id });
    
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Erro ao logar usuário", error });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if(!token) {
      return res.status(400).json({ message: "Token não fornecido" });
    }

    //Verificar se o token existe no banco
    const storedToken = await RefreshToken.findOne({ token });

    if(!storedToken) {
      return res.status(403).json({ message: "Token inválido" });
    }

    jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
      if(err) {
        return res.status(403).json({ message: "Token inválido" });
      }

      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
      
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao renovar token", error });
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.body;

    if(!token) {
      return res.status(400).json({ message: "Token não fornecido" });
    }

    //Verifica se o token existe antes de deletar
    const deletedToken = await RefreshToken.findOneAndDelete({ token });

    if(!deletedToken) {
      return res.status(404).json({ message: "Token inválido ou já removido" });
    }

    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar logout", error });
  }
};

module.exports = { register, login, refreshToken, logout };
