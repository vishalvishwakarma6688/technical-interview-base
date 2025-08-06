// src/api/auth.ts
export const fakeAuthApi = {
  login: async (email: string, password: string) => {
    return new Promise<{ token: string; user: { id: number; name: string } }>((res, rej) => {
      setTimeout(() => {
        if (email === "test@test.com" && password === "1234") {
          res({ token: "dummy-token", user: { id: 1, name: "Test User" } });
        } else {
          rej({ message: "Invalid credentials" });
        }
      }, 500);
    });
  },
  register: async (username: string, email: string, password: string): Promise<{ message: string }> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((u: any) => u.email === email)) {
          rej({ message: "User already exists" });
          return;
        }
        const newUser = { id: Date.now(), username, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        res({ message: "Registered successfully" });
      }, 500);
    });
  },
};
