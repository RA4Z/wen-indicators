import axios from 'axios';

export async function getIndicadores() {
    try {
        const url = 'http://10.1.43.63:5000/WenIndicators/Indicators/Display';
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response.status)
            return []
        }
    } catch {
        console.log('Erro ao conectar com o servidor!')
        return []
    }
}

export async function getDatabase() {
    try {
        const url = 'http://10.1.43.63:5000/WenIndicators/Database/Display';
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response.status)
            return []
        }
    } catch {
        console.log('Erro ao conectar com o servidor!')
        return []
    }
}

export async function getResults() {
    try {
        const url = 'http://10.1.43.63:5000/WenIndicators/Results/Display';
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response.status)
            return []
        }
    } catch {
        console.log('Erro ao conectar com o servidor!')
        return []
    }
}