<template>
    <div class="keygen ">
        <h5>Generator keygen</h5>
        <form class="input-field col s12">
             <p>
                <label>
                    <input name="group1" type="radio" value="1month" 
                            v-model="plan"
                            checked />
                    <span> 1 month</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="group1" type="radio" value="3months" v-model="plan" />
                    <span> 3 months</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="group1" type="radio" value="6months" v-model="plan" />
                    <span> 6 months</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="group1" type="radio" value="1year" v-model="plan" />
                    <span> 1 year - discount 5% </span>
                </label>
            </p>
            <br>
            <submit-btn :isLoading="isLoading"
                        :disableCon="!plan"
                        @onSubmit="submit">
                Generate key
            </submit-btn>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            plan: '',
            isLoading: false,
        }
    },

    methods:{
        submit(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/admin/send-license`, {
                method: 'POST',
                body: JSON.stringify({
                    plan: this.plan
                }),
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ this.$store.state.token
                }
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false
                if(resData.status === 'success'){
                    this.firePopup('success', 'Sent a license key', resData.msg)
                } else {
                    this.firePopup('error', 'Some thing wrong', resData.msg)
                }
            }).catch(err=>{
                this.isLoading = false
                throw err
            })
        }
    },

    mounted(){
    }
}
</script>

<style lang="scss">
    .keygen{
        grid-column: 2/12;
        margin-top: 2rem;
    }
</style>

