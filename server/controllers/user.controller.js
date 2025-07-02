import users from "../data/user.js";

class UserController {
  async getUsers(req, res) {
    try {
      setTimeout(() => {
        res.status(200).json(
          users.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
      }, 500);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { id } = req.params;
      const user = users.find((user) => user.id === id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req, res) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { name, email, gender, city, birthdate, avatar } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
      }

      const newId = (
        Math.max(...users.map((user) => parseInt(user.id))) + 1
      ).toString();

      const newUser = {
        id: newId,
        name,
        email,
        gender: gender || "unknown",
        city: city || "",
        birthdate: birthdate || new Date().toISOString(),
        avatar:
          avatar ||
          `https://avatars.githubusercontent.com/u/${Math.floor(
            Math.random() * 100000000
          )}`,
        createdAt: new Date().toISOString(),
        address: city || "",
      };

      users.push(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { id } = req.params;
      const { name, email, gender, city, birthdate, avatar } = req.body;

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      if (email && email !== users[userIndex].email) {
        const existingUser = users.find(
          (user) => user.email === email && user.id !== id
        );
        if (existingUser) {
          return res
            .status(409)
            .json({ message: "User with this email already exists" });
        }
      }

      const updatedUser = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(gender && { gender }),
        ...(city && { city, address: city }),
        ...(birthdate && { birthdate }),
        ...(avatar && { avatar }),
      };

      users[userIndex] = updatedUser;
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteUser(req, res) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { id } = req.params;
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      const deletedUser = users.splice(userIndex, 1)[0];
      res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new UserController();
