import { z } from "zod";
import { ClientCookies } from "./cookies";

// Base API URL - adjust according to your backend setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

console.log("🌐 HeaderApi API_BASE_URL:", API_BASE_URL);

// TypeScript interfaces for Header Content
export interface MultiLanguageText {
  en: string;
  sv: string;
  ar: string;
}

export interface ContactInfo {
  location: MultiLanguageText;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
}

export interface TopHeader {
  contact: ContactInfo;
  socialMedia: SocialMedia;
}

export interface DropdownItem {
  id: string;
  name: MultiLanguageText;
  href: string;
  isActive: boolean;
  order: number;
}

export interface MenuItem {
  id: string;
  order: number;
  name: MultiLanguageText;
  href: string;
  isActive: boolean;
  hasDropdown: boolean;
  dropdownItems: DropdownItem[];
}

export interface Navigation {
  menuItems: MenuItem[];
}

export interface Language {
  code: string;
  name: MultiLanguageText;
  flag: string;
  isActive: boolean;
  isDefault: boolean;
  direction: "ltr" | "rtl";
}

export interface HeaderContentData {
  topHeader: TopHeader;
  navigation: Navigation;
  languages: Language[];
  loginButton: MultiLanguageText;
  isActive?: boolean;
  version?: string;
}

export interface HeaderContentResponse {
  _id: string;
  topHeader: TopHeader;
  navigation: Navigation;
  languages: Language[];
  loginButton: MultiLanguageText;
  isActive: boolean;
  version: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    headerContents: T[];
    pagination: {
      current: number;
      total: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

// Validation schemas using Zod
export const contactInfoSchema = z.object({
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
});

export const socialMediaSchema = z.object({
  facebook: z.string().url("Valid Facebook URL is required").optional(),
  instagram: z.string().url("Valid Instagram URL is required").optional(),
});

export const dropdownItemSchema = z.object({
  id: z.string().min(1, "Dropdown item ID is required"),
  name: z.string().min(1, "Dropdown item name is required"),
  href: z.string().min(1, "Dropdown item URL is required"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export const menuItemSchema = z.object({
  id: z.string().min(1, "Menu item ID is required"),
  name: z.string().min(1, "Menu item name is required"),
  href: z.string().min(1, "Menu item URL is required"),
  isActive: z.boolean().default(true),
  hasDropdown: z.boolean().default(false),
  order: z.number().min(0, "Order must be 0 or greater"),
  dropdownItems: z.array(dropdownItemSchema).optional().default([]),
});

export const languageSchema = z.object({
  code: z.string().min(1, "Language code is required"),
  name: z.string().min(1, "Language name is required"),
  flag: z.string().url("Valid flag URL is required"),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  direction: z.enum(["ltr", "rtl"]).default("ltr"),
});

export const headerContentSchema = z.object({
  topHeader: z.object({
    contact: contactInfoSchema,
    socialMedia: socialMediaSchema,
  }),
  navigation: z.object({
    menuItems: z.array(menuItemSchema).min(1, "At least one menu item is required"),
  }),
  languages: z.array(languageSchema).min(1, "At least one language is required"),
  loginButton: z.string().min(1, "Login button text is required"),
  isActive: z.boolean().optional().default(true),
  version: z.string().optional().default("1.0"),
});




// Header API functions
class HeaderApiClass {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method for making API requests
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🌐 HeaderApi: Making request to ${url}`);

      const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      // Add auth token if available
      const authToken = ClientCookies.get('authToken');
      if (authToken) {
        defaultHeaders["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ HeaderApi: Request failed with status ${response.status}:`, data);
        return {
          success: false,
          message: data.message || `HTTP Error ${response.status}`,
          errors: data.errors || [data.message || "Unknown error"],
        };
      }

      console.log(`✅ HeaderApi: Request successful to ${endpoint}`);
      return data;
    } catch (error) {
      console.error(`❌ HeaderApi: Network error for ${endpoint}:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error occurred",
        errors: [error instanceof Error ? error.message : "Unknown network error"],
      };
    }
  }

  // Get active header content
  async getActiveHeader(language?: string): Promise<ApiResponse<HeaderContentResponse>> {
    const queryParams = language ? `?lang=${language}` : '';
    return this.makeRequest<HeaderContentResponse>(`/header-content${queryParams}`);
  }

  // Get all header contents (with pagination)
  async getAllHeaders(page = 1, limit = 10): Promise<PaginatedResponse<HeaderContentResponse>> {
    const response = await this.makeRequest<any>(`/header-content/admin/all?page=${page}&limit=${limit}`);
    return response as PaginatedResponse<HeaderContentResponse>;
  }

  // Get specific header by ID
  async getHeaderById(id: string): Promise<ApiResponse<HeaderContentResponse>> {
    return this.makeRequest<HeaderContentResponse>(`/header-content/admin/${id}`);
  }

  // Create new header content
  async createHeader(data: HeaderContentData): Promise<ApiResponse<HeaderContentResponse>> {
    const validationResult = this.validateHeaderData(data);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.errors,
      };
    }

    return this.makeRequest<HeaderContentResponse>("/header-content/admin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Update existing header content
  async updateHeader(id: string, data: Partial<HeaderContentData>): Promise<ApiResponse<HeaderContentResponse>> {
    return this.makeRequest<HeaderContentResponse>(`/header-content/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Delete header content
  async deleteHeader(id: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/header-content/admin/${id}`, {
      method: "DELETE",
    });
  }

  // Toggle header status (active/inactive)
  async toggleHeaderStatus(id: string): Promise<ApiResponse<HeaderContentResponse>> {
    return this.makeRequest<HeaderContentResponse>(`/header-content/admin/${id}/toggle-status`, {
      method: "PATCH",
    });
  }

  // Upload icon
  async uploadIcon(file: File): Promise<ApiResponse<{ url: string; publicId: string }>> {
    try {
      const formData = new FormData();
      formData.append("icon", file);

      const authToken = ClientCookies.get('authToken');
      const headers: HeadersInit = {};
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${this.baseUrl}/header-content/upload/icon`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || `Upload failed with status ${response.status}`,
          errors: data.errors || [data.message || "Upload failed"],
        };
      }

      return data;
    } catch (error) {
      console.error("❌ HeaderApi: Icon upload error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Upload error occurred",
        errors: [error instanceof Error ? error.message : "Unknown upload error"],
      };
    }
  }

  // Delete icon
  async deleteIcon(publicId: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/header-content/upload/icon/${publicId}`, {
      method: "DELETE",
    });
  }

  // Validation methods
  validateHeaderData(data: HeaderContentData): { isValid: boolean; errors: string[] } {
    try {
      headerContentSchema.parse(data);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.issues.map((err: any) => `${err.path.join(".")}: ${err.message}`),
        };
      }
      return { isValid: false, errors: ["Unknown validation error"] };
    }
  }

  validateContactInfo(data: ContactInfo): { isValid: boolean; errors: string[] } {
    try {
      contactInfoSchema.parse(data);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.issues.map((err: any) => `${err.path.join(".")}: ${err.message}`),
        };
      }
      return { isValid: false, errors: ["Unknown validation error"] };
    }
  }

  validateMenuItem(data: MenuItem): { isValid: boolean; errors: string[] } {
    try {
      menuItemSchema.parse(data);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.issues.map((err: any) => `${err.path.join(".")}: ${err.message}`),
        };
      }
      return { isValid: false, errors: ["Unknown validation error"] };
    }
  }

  validateLanguage(data: Language): { isValid: boolean; errors: string[] } {
    try {
      languageSchema.parse(data);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.issues.map((err: any) => `${err.path.join(".")}: ${err.message}`),
        };
      }
      return { isValid: false, errors: ["Unknown validation error"] };
    }
  }
}

// Create and export the singleton instance
export const headerApi = new HeaderApiClass();

// Export individual functions for convenience
export const {
  getActiveHeader,
  getAllHeaders,
  getHeaderById,
  createHeader,
  updateHeader,
  deleteHeader,
  toggleHeaderStatus,
  uploadIcon,
  deleteIcon,
  validateHeaderData,
  validateContactInfo,
  validateMenuItem,
  validateLanguage,
} = headerApi;

// Default export
export default headerApi;
