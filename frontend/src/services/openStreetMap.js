// export async function openStreetMap() {
//   const url =
//     "https://api.openstreetmap.org/api/0.6/map?bbox=-0.489,51.28,0.236,51.686";

//   fetch(url)
//     .then((res) => res.text())
//     .then((xml) => {
//       const doc = new DOMParser().parseFromString(xml, "text/xml");
//       console.log(doc.getElementsByTagName("node").length, "nodes");
//     });

//   const data = await url.json();
//   console.log(data);

//   return await data;
// }
