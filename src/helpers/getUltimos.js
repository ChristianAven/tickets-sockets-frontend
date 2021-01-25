export const getUltimos = async() => {

    const res = await fetch('http://localhost:4000/ultimos')
    const data = await res.json();

    return data.ultimos;

};