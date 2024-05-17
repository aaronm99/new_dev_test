export default async function getPlanetData() {
  try {
    const res = await fetch(
      "https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json"
    );

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
