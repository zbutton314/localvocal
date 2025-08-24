import { 
    type Organization, 
    type InsertOrganization,
    type Ensemble,
    type InsertEnsemble,
    type OrganizationWithEnsembles
  } from "@shared/schema";
  import { randomUUID } from "crypto";
  import { promises as fs } from "fs";
  import path from "path";
  
  export interface IStorage {
    // Organizations
    getOrganizations(): Promise<Organization[]>;
    getOrganization(id: string): Promise<OrganizationWithEnsembles | undefined>;
    createOrganization(organization: InsertOrganization): Promise<Organization>;
    
    // Ensembles
    getEnsembles(): Promise<Ensemble[]>;
    getEnsemblesByOrganization(organizationId: string): Promise<Ensemble[]>;
    createEnsemble(ensemble: InsertEnsemble): Promise<Ensemble>;
  }
  
  class JsonStorage implements IStorage {
    private dataDir = path.join(process.cwd(), 'data');
    private organizationsFile = path.join(this.dataDir, 'organizations.json');
    private ensemblesFile = path.join(this.dataDir, 'ensembles.json');
  
    constructor() {
      this.ensureDataDirectory();
    }
  
    private async ensureDataDirectory() {
      try {
        await fs.mkdir(this.dataDir, { recursive: true });
      } catch (error) {
        console.error('Error creating data directory:', error);
        throw new Error(`Failed to create data directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    private async readJsonFile<T>(filePath: string, defaultValue: T[] = []): Promise<T[]> {
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        if (!data.trim()) {
          return defaultValue;
        }
        return JSON.parse(data);
      } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
          // File doesn't exist, return default
          return defaultValue;
        }
        console.error(`Error reading file ${filePath}:`, error);
        throw new Error(`Failed to read data file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    private async writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
      try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw new Error(`Failed to write data file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  
    async getOrganizations(): Promise<Organization[]> {
      return this.readJsonFile<Organization>(this.organizationsFile);
    }
  
    async getOrganization(id: string): Promise<OrganizationWithEnsembles | undefined> {
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid organization ID provided');
      }

      const organizations = await this.readJsonFile<Organization>(this.organizationsFile);
      const organization = organizations.find(org => org.id === id);
      if (!organization) return undefined;
  
      const ensembles = await this.getEnsemblesByOrganization(id);
      return {
        ...organization,
        ensembles
      };
    }

    async getOrganizationBySlug(urlSlug: string): Promise<OrganizationWithEnsembles | undefined> {
      if (!urlSlug || typeof urlSlug !== 'string') {
        throw new Error('Invalid organization urlSlug provided');
      }

      const organizations = await this.readJsonFile<Organization>(this.organizationsFile);
      const organization = organizations.find(org => org.urlSlug === urlSlug);
      if (!organization) return undefined;
  
      const ensembles = await this.getEnsemblesByOrganization(organization.id);
      return {
        ...organization,
        ensembles
      };
    }
  
    async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
      // Validate required fields
      if (!insertOrganization.name?.trim()) {
        throw new Error('Organization name is required');
      }

      const organizations = await this.readJsonFile<Organization>(this.organizationsFile);
      const id = randomUUID();
      const organization: Organization = { 
        ...insertOrganization, 
        id,
        shortName: insertOrganization.shortName || null,
        urlSlug: insertOrganization.urlSlug || null,
        website: insertOrganization.website || null,
        socialMedia: insertOrganization.socialMedia || null,
        email: insertOrganization.email || null,
        religiousAffiliation: insertOrganization.religiousAffiliation || null,
        missionStatement: insertOrganization.missionStatement || null,

      };
      
      organizations.push(organization);
      await this.writeJsonFile(this.organizationsFile, organizations);
      
      return organization;
    }
  
    async getEnsembles(): Promise<Ensemble[]> {
      return this.readJsonFile<Ensemble>(this.ensemblesFile);
    }
  
    async getEnsemblesByOrganization(organizationId: string): Promise<Ensemble[]> {
      if (!organizationId || typeof organizationId !== 'string') {
        throw new Error('Invalid organization ID provided');
      }

      const ensembles = await this.readJsonFile<Ensemble>(this.ensemblesFile);
      return ensembles.filter(ensemble => ensemble.organizationId === organizationId);
    }
  
    async createEnsemble(insertEnsemble: InsertEnsemble): Promise<Ensemble> {
      // Validate required fields
      if (!insertEnsemble.name?.trim()) {
        throw new Error('Ensemble name is required');
      }
      if (!insertEnsemble.organizationId?.trim()) {
        throw new Error('Organization ID is required');
      }

      // Verify organization exists
      const organizations = await this.getOrganizations();
      const organizationExists = organizations.some(org => org.id === insertEnsemble.organizationId);
      if (!organizationExists) {
        throw new Error('Organization not found');
      }

      const ensembles = await this.readJsonFile<Ensemble>(this.ensemblesFile);
      const id = randomUUID();
      const ensemble: Ensemble = { 
        ...insertEnsemble, 
        id,
        shortName: insertEnsemble.shortName || null,
        organizationName: insertEnsemble.organizationName || null,
        website: insertEnsemble.website || null,
        director: insertEnsemble.director || null,
        ageGroup: insertEnsemble.ageGroup || null,
        voiceType: insertEnsemble.voiceType || null,
        ensembleType: insertEnsemble.ensembleType || null,
        location: insertEnsemble.location || null,
        auditioned: insertEnsemble.auditioned || null,
        payLevel: insertEnsemble.payLevel || null,
        ageRestrictions: insertEnsemble.ageRestrictions || null,
        otherRestrictions: insertEnsemble.otherRestrictions || null,
        season: insertEnsemble.season || null,
        rehearsalDetails: insertEnsemble.rehearsalDetails || null
      };
      
      ensembles.push(ensemble);
      await this.writeJsonFile(this.ensemblesFile, ensembles);
      
      return ensemble;
    }
  }
  
  export const storage = new JsonStorage();