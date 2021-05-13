
import config from '../config.json';


export async function callWebCrawler(target) {
        try {
                console.log("Attempting connection to AWS server...");
                let response = await fetch(config.AWS.ip, {
                        method: "POST",
                        headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                searchTerm: target,
                        }),
                });
                let responseJson = await response.json();
                console.log("Connection successfully made.");
                return responseJson;
        } catch (err) {
                console.log(err);
        }
}

async function googleVision(base64) {
        loading = true;
        try {
                let body = JSON.stringify({
                        requests: [
                                {
                                        features: [
                                                { type: 'LABEL_DETECTION', maxResults: 5 },
                                                //{ type: 'LANDMARK_DETECTION', maxResults: 5 },
                                                //{ type: 'FACE_DETECTION', maxResults: 5 },
                                                { type: 'LOGO_DETECTION', maxResults: 5 },
                                                { type: 'TEXT_DETECTION', maxResults: 5 },
                                                //{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                                                //{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
                                                { type: 'IMAGE_PROPERTIES', maxResults: 5 },
                                                //{ type: 'CROP_HINTS', maxResults: 5 },
                                                //{ type: 'WEB_DETECTION', maxResults: 5 }
                                        ],
                                        image: {
                                                content: base64
                                        }
                                }
                        ]
                });
                console.log("Sending json...");
                let response = await fetch(
                        config.googleCloud.api + config.googleCloud.apiKey,
                        {
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: body
                        }
                );
                console.log("Received response");
                let responseJson = await response.json();
                apiResult = responseJson.responses[0].labelAnnotations[0].description;
                console.log("api result")
                console.log(apiResult)

        } catch (error) {
                console.log(error);
        }
        loading = false;
        return apiResult;

}

export default googleVision;