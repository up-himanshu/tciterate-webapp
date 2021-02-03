export default async function() {
  let promise = new Promise((resolve, reject) => {
    let partner = localStorage.getItem('partner');
    if (partner) {
      try {
        let partnerObj = JSON.parse(partner);
        resolve(partnerObj);
      } catch (error) {
        reject(error);
      }
    } else {
      reject({ error: 'No partner found in localstorage.' });
    }
  });
  let res = await promise;
  return res;
}
