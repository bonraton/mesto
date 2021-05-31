export class UserInfo {
    constructor(profileName, profileDescription, avatarLink) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._avatarLink = document.querySelector(avatarLink);
    }

    getUserInfo() {
        const userData = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
            avatarLink: this._avatarLink.src
        };
        return userData
    }

    setUserInfo = (name, description) => {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }

    setUserAvatar = (avatar) => {
        this._avatarLink.src = avatar
    }
}

// добавить аватар