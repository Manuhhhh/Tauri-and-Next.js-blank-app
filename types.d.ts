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
  zone?: string;
  email?: string;
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
  zone?: string;
  email?: string;
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
  zone?: string;
  email?: string;
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
  permanent: boolean;
  name: string;
  description?: string;
  svg_logo?: string;
  _id: ObjectId;
}

type AddCategory = {
  category_type: 'business' | 'event' | '';
  name: string;
  description?: string;
  svg_logo?: string;
  password?: string;
}

type EditCategory = {
  edit_id: string;
  name: string;
  description?: string;
  svg_logo?: string;
  type: 'business' | 'event';
  password?: string;
}