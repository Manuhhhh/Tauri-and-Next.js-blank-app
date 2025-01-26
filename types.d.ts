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

type EditBusiness = {
  editId: string;
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
  password?: string;
}


type ResponseBusiness = {
  businessList: Business[];
  pagesCount: number;
};

type AddBusiness = {
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
  password: string;
};

type DbEvent = {
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

type ResponseEvents = {
  eventList: DbEvent[];
  pagesCount: number;
}

type Category = {
  type: 'business' | 'event';
  permanent?: boolean;
  name?: string;
  description?: string;
  svg_logo?: string;
  _id: ObjectId;
}

type AddCategory = {
  type?: 'business' | 'event';
  name: string;
  description?: string;
  svg_logo?: string;
}