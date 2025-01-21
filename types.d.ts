type Business = {
  _id: ObjectId;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  openingHours?: string;
  openingTime?: string;
  location?: string;
  categories?: string[];
  image?: string;
  contact?: string;
  site?: string;
};

type ResponseBusiness = {
  businessList: Business[];
  pagesCount: number;
};