import React, {useContext, useReducer, useEffect} from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courses_reducer";
import axios from 'axios';

const initialState = {
    courses: [],
    single_course: {},
    categories: [],
}

const API_URL = "http://localhost:5000/api/";

const CoursesContext = React.createContext();

export const CoursesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}courses`);
            // We now expect an object, so we dispatch response.data.courses
            dispatch({type: GET_COURSES, payload: response.data.courses});
        } catch(error) {
            console.error("Error fetching courses:", error);
        }
    }

    const fetchSingleCourse = async (id) => {
        try {
            const response = await axios.get(`${API_URL}courses/${id}`);
            dispatch({type: GET_SINGLE_COURSE, payload: response.data})
        } catch(error) {
            console.error("Error fetching single course:", error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}categories`);
            dispatch({type: GET_CATEGORIES, payload: response.data});
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            ...state,
            fetchSingleCourse
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCoursesContext = () => {
    return useContext(CoursesContext);
}