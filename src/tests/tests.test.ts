import { register, login, getCurrentUser } from "../controllers/authcontroller";
import Utilisateur from "../models/Utilisateur.model";
import { generateToken } from "../utils/JWTUtils";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../models/Utilisateur.model");
jest.mock("../utils/JWTUtils");

describe("UserController", () => {
  let req: any;
  let res: any;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let cookieMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    cookieMock = jest.fn();

    req = { body: {}, cookies: {} };
    res = { status: statusMock, json: jsonMock, cookie: cookieMock };

    jest.clearAllMocks();
  });

  describe("register", () => {
    it("devrait enregistrer un nouvel utilisateur correctement", async () => {
      req.body = {
        nom: "Jean",
        email: "jean@example.com",
        password: "Password123!",
        role: "user",
        bio: "bio...",
        profilePicture: "pic.png",
        socialLinks: [],
      };

      (Utilisateur.findOne as jest.Mock).mockResolvedValue(null);
      (bcryptjs.hash as jest.Mock).mockResolvedValue("hashed_password");

      const newUserMock = {
        id: 1,
        nom: req.body.nom,
        email: req.body.email,
        role: req.body.role,
        bio: req.body.bio,
        profilePicture: req.body.profilePicture,
        socialLinks: req.body.socialLinks,
      };
      (Utilisateur.create as jest.Mock).mockResolvedValue(newUserMock);

      await register(req, res);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Utilisateur créé avec succès",
        utilisateur: newUserMock,
      });
    });

    it("devrait retourner une erreur si l'utilisateur existe déjà", async () => {
      req.body = {
        nom: "Jean",
        email: "jean@example.com",
        password: "Password123!",
      };
      (Utilisateur.findOne as jest.Mock).mockResolvedValue({ email: req.body.email });

      await register(req, res);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Cet email est déjà utilisé." });
    });
  });

  describe("login", () => {
    it("devrait authentifier et retourner un token", async () => {
      req.body = { email: "jean@example.com", password: "correct_password" };
      (Utilisateur.findOne as jest.Mock).mockResolvedValue({
        id: 1,
        role: "user",
        password: "hashed_password",
      });
      (bcryptjs.compare as jest.Mock).mockResolvedValue(true);

      (generateToken as jest.Mock).mockReturnValue("mocked_jwt_token");

      await login(req, res);
      expect(cookieMock).toHaveBeenCalledWith(
        "jwt",
        "mocked_jwt_token",
        expect.objectContaining({
          httpOnly: true,
          sameSite: "lax",
          secure: expect.any(Boolean),
        })
      );
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Connexion réussie",
        token: "mocked_jwt_token",
        utilisateur: 1,
      });
    });
  });

  describe("getCurrentUser", () => {
    it("devrait retourner une erreur s'il n'y a pas de token", async () => {
      req.cookies = {};
      await getCurrentUser(req, res);
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Non authentifié" });
    });

    it("devrait retourner l'utilisateur courant si le token est valide", async () => {
      req.cookies.jwt = "valid.token.jwt";
      (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
      (Utilisateur.findByPk as jest.Mock).mockResolvedValue({ id: 1, email: "jean@example.com" });

      await getCurrentUser(req, res);
      expect(jsonMock).toHaveBeenCalledWith({ id: 1, email: "jean@example.com" });
    });

    it("devrait retourner une erreur 404 si l'utilisateur n'est pas trouvé", async () => {
      req.cookies.jwt = "valid.token.jwt";
      (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
      (Utilisateur.findByPk as jest.Mock).mockResolvedValue(null);

      await getCurrentUser(req, res);
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Utilisateur non trouvé" });
    });
  });
});