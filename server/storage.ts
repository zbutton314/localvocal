// import { 
//   type Organization, 
//   type InsertOrganization,
//   type Ensemble,
//   type InsertEnsemble,
//   type OrganizationWithEnsembles
// } from "@shared/schema";
// import { randomUUID } from "crypto";

// export interface IStorage {
//   // Organizations
//   getOrganizations(): Promise<Organization[]>;
//   getOrganization(id: string): Promise<OrganizationWithEnsembles | undefined>;
//   createOrganization(organization: InsertOrganization): Promise<Organization>;
  
//   // Ensembles
//   getEnsembles(): Promise<Ensemble[]>;
//   getEnsemblesByOrganization(organizationId: string): Promise<Ensemble[]>;
//   createEnsemble(ensemble: InsertEnsemble): Promise<Ensemble>;
// }

// export class MemStorage implements IStorage {
//   private organizations: Map<string, Organization> = new Map();
//   private ensembles: Map<string, Ensemble> = new Map();

//   constructor() {
//     this.initializeData();
//   }

//   private initializeData() {
//     // Organizations
//     const kcChorale: Organization = {
//       id: "org-1",
//       name: "Kansas City Chorale",
//       description: "A professional chamber choir dedicated to performing choral masterworks and contemporary compositions",
//       location: "Kansas City, MO",
//       contactEmail: "info@kcchorale.org",
//       contactPhone: "(816) 555-0123",
//       website: "https://kcchorale.org",
//       imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
//     };

//     const heartlandVoices: Organization = {
//       id: "org-2",
//       name: "Heartland Voices",
//       description: "Community choir bringing together singers of all skill levels to celebrate the joy of choral music",
//       location: "Overland Park, KS",
//       contactEmail: "hello@heartlandvoices.org",
//       contactPhone: "(913) 555-0456",
//       website: "https://heartlandvoices.org",
//       imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop"
//     };

//     const gospelHarmony: Organization = {
//       id: "org-3",
//       name: "Gospel Harmony Collective",
//       description: "Contemporary gospel choir spreading joy and inspiration through powerful vocal performances",
//       location: "Kansas City, KS",
//       contactEmail: "contact@gospelharmony.org",
//       contactPhone: "(913) 555-0789",
//       website: "https://gospelharmony.org",
//       imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop"
//     };

//     const renaissanceSingers: Organization = {
//       id: "org-4",
//       name: "Renaissance Singers",
//       description: "Specialized ensemble performing early music and Renaissance polyphony with period instruments",
//       location: "Kansas City, MO",
//       contactEmail: "info@renaissancesingers.org",
//       contactPhone: "(816) 555-0321",
//       website: "https://renaissancesingers.org",
//       imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
//     };

//     const youthHarmony: Organization = {
//       id: "org-5",
//       name: "Youth Harmony Chorus",
//       description: "Dedicated to developing young vocal talent through comprehensive music education and performance",
//       location: "Leawood, KS",
//       contactEmail: "director@youthharmony.org",
//       contactPhone: "(913) 555-0654",
//       website: "https://youthharmony.org",
//       imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop"
//     };

//     const jazzVoices: Organization = {
//       id: "org-6",
//       name: "Jazz Voices KC",
//       description: "Vocal jazz ensemble specializing in contemporary arrangements and improvisation",
//       location: "Kansas City, MO",
//       contactEmail: "info@jazzvoiceskc.org",
//       contactPhone: "(816) 555-0987",
//       website: "https://jazzvoiceskc.org",
//       imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop"
//     };

//     [kcChorale, heartlandVoices, gospelHarmony, renaissanceSingers, youthHarmony, jazzVoices].forEach(org => {
//       this.organizations.set(org.id, org);
//     });

//     // Ensembles
//     const ensembleData: Ensemble[] = [
//       {
//         id: "ens-1",
//         organizationId: "org-1",
//         name: "Chamber Choir",
//         description: "Professional ensemble performing classical and contemporary choral works",
//         genre: "Classical",
//         voicing: "SATB",
//         auditioned: true,
//         meetingDay: "Tuesday",
//         meetingTime: "7:00 PM"
//       },
//       {
//         id: "ens-2",
//         organizationId: "org-1",
//         name: "Festival Chorus",
//         description: "Large ensemble for major works and special performances",
//         genre: "Classical",
//         voicing: "SATB",
//         auditioned: false,
//         meetingDay: "Thursday",
//         meetingTime: "7:30 PM"
//       },
//       {
//         id: "ens-3",
//         organizationId: "org-2",
//         name: "Community Choir",
//         description: "Open to all singers, no audition required",
//         genre: "Contemporary",
//         voicing: "SATB",
//         auditioned: false,
//         meetingDay: "Monday",
//         meetingTime: "6:30 PM"
//       },
//       {
//         id: "ens-4",
//         organizationId: "org-3",
//         name: "Gospel Choir",
//         description: "Contemporary gospel music with powerful vocal arrangements",
//         genre: "Gospel",
//         voicing: "Mixed",
//         auditioned: false,
//         meetingDay: "Wednesday",
//         meetingTime: "7:00 PM"
//       },
//       {
//         id: "ens-5",
//         organizationId: "org-4",
//         name: "Renaissance Ensemble",
//         description: "Specialized in early music and period performance",
//         genre: "Classical",
//         voicing: "SATB",
//         auditioned: true,
//         meetingDay: "Friday",
//         meetingTime: "6:00 PM"
//       },
//       {
//         id: "ens-6",
//         organizationId: "org-5",
//         name: "Youth Choir",
//         description: "Ages 12-18, comprehensive vocal training",
//         genre: "Contemporary",
//         voicing: "SSA",
//         auditioned: false,
//         meetingDay: "Saturday",
//         meetingTime: "10:00 AM"
//       },
//       {
//         id: "ens-7",
//         organizationId: "org-6",
//         name: "Jazz Ensemble",
//         description: "Vocal jazz with contemporary arrangements",
//         genre: "Jazz",
//         voicing: "Mixed",
//         auditioned: true,
//         meetingDay: "Tuesday",
//         meetingTime: "8:00 PM"
//       }
//     ];

//     ensembleData.forEach(ensemble => {
//       this.ensembles.set(ensemble.id, ensemble);
//     });
//   }

//   async getOrganizations(): Promise<Organization[]> {
//     return Array.from(this.organizations.values());
//   }

//   async getOrganization(id: string): Promise<OrganizationWithEnsembles | undefined> {
//     const organization = this.organizations.get(id);
//     if (!organization) return undefined;

//     const ensembles = Array.from(this.ensembles.values()).filter(
//       ensemble => ensemble.organizationId === id
//     );

//     return {
//       ...organization,
//       ensembles
//     };
//   }

//   async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
//     const id = randomUUID();
//     const organization: Organization = { ...insertOrganization, id };
//     this.organizations.set(id, organization);
//     return organization;
//   }

//   async getEnsembles(): Promise<Ensemble[]> {
//     return Array.from(this.ensembles.values());
//   }

//   async getEnsemblesByOrganization(organizationId: string): Promise<Ensemble[]> {
//     return Array.from(this.ensembles.values()).filter(
//       ensemble => ensemble.organizationId === organizationId
//     );
//   }

//   async createEnsemble(insertEnsemble: InsertEnsemble): Promise<Ensemble> {
//     const id = randomUUID();
//     const ensemble: Ensemble = { ...insertEnsemble, id };
//     this.ensembles.set(id, ensemble);
//     return ensemble;
//   }
// }

// export const storage = new MemStorage();

export { storage } from './json-storage';