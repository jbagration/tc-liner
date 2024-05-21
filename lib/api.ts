import axios from 'axios';

const backendUrl = 'https://tclainer.backend.demowts.ru/api';

export const getShops = async (): Promise<Shop[]> => {
  try {
    const response = await axios.get(`${backendUrl}/shops`);
    return response.data.data.shops.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};

export interface Shop {
  id: number | string;
  name: string;
  logo: string;
  description: string;
  working_hours: string;
  website: string;
  social_media_link: string;
  shop_category_id: number;
  deletedAt: string | null;
  shop_category_name: string;
  food_category_name: string;
  service_category_name: string;
}

interface ShopData {
    shops: {
      data: Shop[];
      pagination: {
        total: number;
        lastPage: number;
        prevPage: number | null;
        nextPage: number | null;
        perPage: number;
        currentPage: number;
        from: number;
        to: number;
      };
    };
    page: number;
    limit: number;
    totalCount: number;
    currentCount: number;
    message: string | null;
    status: string;
  }

  export const getFood = async (): Promise<Food[]> => {
    try {
      const response = await axios.get(`${backendUrl}/food`);
      return response.data.data.foods.data;
    } catch (error) {
      console.error('Error fetching food:', error);
      throw error;
    }
  };
  
  export interface Food extends Shop {
    id: number;
    name: string;
    logo: string;
    description: string;
    working_hours: string;
    website: string;
    social_media_link: string;
    food_category_id: number;
    deletedAt: string | null;
    food_category_name: string;
  }
  
  interface FoodData {
    foods: {
      data: Food[];
      pagination: {
        total: number;
        lastPage: number;
        prevPage: number | null;
        nextPage: number | null;
        perPage: number;
        currentPage: number;
        from: number;
        to: number;
      };
    };
    page: number;
    limit: number;
    totalCount: number;
    currentCount: number;
    message: string | null;
    status: string;
  }

  export const getServices = async (): Promise<Service[]> => {
    try {
    const response = await axios.get(`${backendUrl}/services`);
    return response.data.data.services.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export interface Service extends Shop {
  id: number;
  name: string;
  logo: string;
  description: string;
  working_hours: string;
  website: string;
  social_media_link: string;
  service_category_id: number;
  deletedAt: string | null;
  service_category_name: string;
}

interface ServiceData {
  services: {
    data: Service[];
    pagination: {
      total: number;
      lastPage: number;
      prevPage: number | null;
      nextPage: number | null;
      perPage: number;
      currentPage: number;
      from: number;
      to: number;
    };
  };
  page: number;
  limit: number;
  totalCount: number;
  currentCount: number;
  message: string | null;
  status: string;
}

export const getAdministration = async (): Promise<Administrator[]> => {
  try {
    const response = await axios.get(`${backendUrl}/administration`);
    return response.data.data.administration.data;
    } catch (error) {
    console.error('Error fetching administration:', error);
    throw error;
  }
};

export interface Administrator extends Shop {
  id: number;
  name: string;
  email: string;
  title: string;
  photo: string;
  deletedAt: string | null;
}

interface AdministrationData {
  administration: {
    data: Administrator[];
    pagination: {
      total: number;
      lastPage: number;
      prevPage: number | null;
      nextPage: number | null;
      perPage: number;
      currentPage: number;
      from: number;
      to: number;
    };
  };
  page: number;
  limit: number;
  totalCount: number;
  currentCount: number;
  status: string;
  message: string | null;
}

export const getNewsAndOffers = async (): Promise<NewsAndOffer[]> => {
  try { 
    const response = await axios.get(`${backendUrl}/news-and-offers/published`);
    return response.data.data.newsAndOffers.data;
  } catch (error) {
    console.error('Error fetching news and offers:', error);
    throw error;
  }
};

export const getNewsAndOfferById = async (id: string): Promise<NewsAndOfferId> => {
  try { 
    const response = await axios.get(`${backendUrl}/news-and-offers/${id}`);
    console.log(response)
    return response.data.data.newsAndOffers;
  } catch (error) {
    console.error(`Error fetching news and offer with ID ${id}:`, error);
    throw error;
  }
};

export interface NewsAndOffer extends Shop {
  id: number | string;
  title: string;
  photo: string;
  description: string;
  shortDescription: string;
  news_and_offers_category_id: number;
  deletedAt: string | null;
  news_and_offers_category_name: string;
}

export interface NewsAndOfferId extends Shop {
  id: number | string;
  title: string;
  photo: string;
  description: string;
  shortDescription: string;
  news_and_offers_category_id: number;
  deletedAt: string | null;
  news_and_offers_category_name: string;
}

interface NewsAndOffersData {
  services: {
    data: NewsAndOffer[];
    pagination: {
      total: number;
      lastPage: number;
      prevPage: number | null;
      nextPage: number | null;
      perPage: number;
      currentPage: number;
      from: number;
      to: number;
    };
  };
  page: number;
  limit: number;
  totalCount: number;
  currentCount: number;
  message: string | null;
  status: string;
}
