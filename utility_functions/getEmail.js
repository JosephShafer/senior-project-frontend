let getEmail = async (token) => {
    if (!token) return;

    if (token['AuthOwner'] === 'Google') {
      let result = await fetch("https://content-people.googleapis.com/v1/people/me?personFields=names,emailAddresses", {
        "credentials": "include",
        "headers": {
          "Authorization": `Bearer ${token.params.access_token}`,
        },
        "method": "GET",
      })
        .then(response => response.json())
        .then(json => {
          let returnedEmail = json.emailAddresses[0].value;
          console.log("EMAIL HIST: " + returnedEmail);
          return returnedEmail;
        })
      return result;
    }

    if (token['AuthOwner'] === 'Snap&Go') {
      let result = token.User.email;
      return result;
    }
  }


export default getEmail;