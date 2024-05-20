export default async function getPlanetData() {
  try {
    const res = await fetch(process.env.PLANET_API!);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const planetData = await res.json();

    return planetData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
