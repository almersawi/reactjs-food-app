import { BASE_URL } from '../constants/BACKEND';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Meal } from '../types/meal';

const useMeals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    
    const getMeals = useCallback(
        async () => {
            const httpClient = axios.create({baseURL: `${BASE_URL}/meals.json`});
            setLoading(true);
            const response = await httpClient.get('');
            let convertedMeals: any[] = [];
            for(let key in response.data) {
                const meal = {id: key, ...response.data[key]};
                convertedMeals.push(meal);
            }
            setMeals(convertedMeals);
            setLoading(false);
        }, []
    )

    useEffect(() => {
        getMeals();
    }, [getMeals])

    return { meals, loading };
}

export default useMeals;