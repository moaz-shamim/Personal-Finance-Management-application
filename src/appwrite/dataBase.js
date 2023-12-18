import { Client, Databases } from "appwrite";
import conf from "../environment_export/config";

export class dataBaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
  }

  // Create Expense Service Method
  async createExpense({
    name,
    date,
    category,
    description,
    amount,
    userId,
    slug,
    userName,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          name,
          date,
          category,
          description: String(description),
          amount,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createExpense :: error", error);
    }
  }

  // Delete Expense Service Method
  async deleteExpense(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log(slug);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteExpense :: error", error);
      return false;
    }
  }

  // Update Expense Service Method
  async updateExpense(slug, { name, date, category, description, amount }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          name,
          date,
          category,
          description,
          amount,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updateExpense :: error", error);
    }
  }

  // Get a particular Expense Servie Method
  async getExpense(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getExpense :: error", error);
      return false;
    }
  }

  // Get all Expenses Servie Method
  async getExpenses() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite Service :: getExpenses :: error", error);
      return false;
    }
  }
}

const databaseService = new dataBaseService();

export default databaseService;
