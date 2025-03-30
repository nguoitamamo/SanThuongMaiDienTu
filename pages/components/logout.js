import API, {endpoints} from "../../Networking/API";


const LogOut = async () => {
    try {
        let res = await API.post(endpoints.users + "logout/");
        

    }
    catch(error) {
        console.log(error);

    }

}

