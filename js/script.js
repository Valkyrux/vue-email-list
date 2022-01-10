const app = new Vue({
    el: "#app",
    data: {
        emails: [],
        numberOfEmail: 0,
        loadingDots: ""
    },
    watch: {
        "numberOfEmail":  function () {
            if (this.emails.length != 10) {
                axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
                .then( (response) => {
                    const aNewEmail = response.data.response;
                    if (!this.emails.includes(aNewEmail)) {
                        this.emails.push(aNewEmail);
                    }
                    this.numberOfEmail++;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    },
    created() {
        axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
        .then( (response) => {
            this.emails.push(response.data.response);
            this.numberOfEmail++;
        })
        .catch(function (error) {
            console.log(error);
        });
        setInterval(() => {
            if(this.loadingDots != "...") {    
                this.loadingDots += "."
            } else {
                this.loadingDots = ""
            }
        }, 400);

    }
});