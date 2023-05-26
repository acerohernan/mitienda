import axios from "axios";

export const fetchData = axios;
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import * as product from "./product";
import * as store from "./store";
import * as tenant from "./tenant";

export const API = { tenant, store, product };
