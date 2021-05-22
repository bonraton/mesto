export class UserInfo {
    constructor(profileName, profileDescription) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        const userData = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent
        };
        return userData
    }

    setUserInfo = (name, description) => {
        this._profileName.textContent = name.value;
        this._profileDescription.textContent = description.value;
    }
}