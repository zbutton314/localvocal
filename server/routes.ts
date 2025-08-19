import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Extend Express Request type to include session
declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      isAuthenticated?: boolean;
      destroy?: (callback: (err?: any) => void) => void;
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is required. Please set it in your .env file or environment variables."
    );
  }
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Middleware to check if user is authenticated
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session?.isAuthenticated) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    next();
  };

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Set session as authenticated
      if (!req.session) {
        req.session = {};
      }
      req.session.isAuthenticated = true;

      res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    if (req.session?.destroy) {
      req.session.isAuthenticated = false;
      req.session.destroy((err: any) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: 'Logout successful' });
      });
    } else {
      if (req.session) {
        req.session.isAuthenticated = false;
      }
      res.json({ message: 'Logout successful' });
    }
  });

  app.get("/api/admin/status", (req, res) => {
    res.json({ 
      isAuthenticated: req.session?.isAuthenticated || false 
    });
  });

  // Organizations
  app.get("/api/organizations", async (req, res) => {
    try {
      const organizations = await storage.getOrganizations();
      res.json(organizations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizations" });
    }
  });

  app.get("/api/organizations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const organization = await storage.getOrganization(id);
      
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
      
      res.json(organization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organization" });
    }
  });

  app.get("/api/orgs/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const organization = await storage.getOrganizationBySlug(slug);
      
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
      
      res.json(organization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organization" });
    }
  });

  // Ensembles
  app.get("/api/ensembles", async (req, res) => {
    try {
      const ensembles = await storage.getEnsembles();
      res.json(ensembles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ensembles" });
    }
  });

  app.get("/api/organizations/:id/ensembles", async (req, res) => {
    try {
      const { id } = req.params;
      const ensembles = await storage.getEnsemblesByOrganization(id);
      res.json(ensembles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ensembles" });
    }
  });

  // Protected admin routes
  app.post("/api/admin/organizations", requireAuth, async (req, res) => {
    try {
      const organization = await storage.createOrganization(req.body);
      res.json(organization);
    } catch (error) {
      res.status(500).json({ message: "Failed to create organization" });
    }
  });

  app.post("/api/admin/ensembles", requireAuth, async (req, res) => {
    try {
      const ensemble = await storage.createEnsemble(req.body);
      res.json(ensemble);
    } catch (error) {
      res.status(500).json({ message: "Failed to create ensemble" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
