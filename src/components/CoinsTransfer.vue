<template>
  <div>
    <transition name="slide-fade" v-show="this.notification.stateSuccess">
      <div class="notification notificationSuccess" >
        <fa-icon class="icon" icon="check"></fa-icon>
        <span class="spanIcon"></span>
        <div>
          <h2 class="title">{{notification.title}}</h2>
          <h4 class="subtitle">{{notification.subtitle}}</h4>
        </div>
      </div>
    </transition>

    <transition name="slide-fade" v-show="this.notification.stateError">
      <div class="notification notificationError" >
        <fa-icon class="icon" icon="times"></fa-icon>
        <span class="spanIcon"></span>
        <div>
          <h2 class="title">{{notification.title}}</h2>
          <h4 class="subtitle">{{notification.subtitle}}</h4>
        </div>
      </div>
    </transition>

    <transition name="slide-fade" v-show="this.notification.stateWarn">
      <div class="notification notificationWarn" >
        <fa-icon class="icon" icon="exclamation-triangle"></fa-icon>
        <span class="spanIcon"></span>
        <div>
          <h2 class="title">{{notification.title}}</h2>
          <h4 class="subtitle">{{notification.subtitle}}</h4>
        </div>
      </div>
    </transition>

    <div class="groupButtons">
      <div class="setCoins">
        <input v-model="setCoins" type="number" id="textCoins" class="textSetCoins" placeholder="Set the value of coins to be transfered." autocomplete="off" autofocus>
        <button class="btn btnSave" id="confirmCoins" @click="confirmCoins()"><fa-icon  icon="check" /></button>
        <button class="btn btnEdit" id="editCoins" @click="editCoins()" disabled><fa-icon icon="edit" /></button>
      </div>      
    </div>    
      <ModalAddPlayer v-on:addNewPlayer="addPlayer($event)" />
    <table>
      <thead class="tableHead">
        <tr>
          <td>#</td>
          <td>Nome do jogador</td>
          <td>Valor do jogador</td>
          <td>Valor pago</td>
          <td>Taxa 5%</td>
          <td>Valor Parcial Total</td>
          <td>#</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(player, index) in players' :key='index'>
          <td>{{ index }}</td>
          <td class="playerName">{{ player.name }}</td>
          <td>{{ player.value }}</td>
          <td>{{ player.payiedValue }}</td>
          <td>{{ player.tax }}</td>
          <td>{{ player.total }}</td>
          <td><button class="btn btnDelete" @click="removePlayer(index)"><fa-icon icon="trash" /></button></td>
        </tr>
      </tbody>
      <thead class="tableFooter">
        <tr>
          <td class="tableFooterText" colspan="3">TOTAL = {{ coinsTransfered }}</td>
          <td colspan="1"></td>
          <td class="tableFooterText" colspan="3">FALTAM  = {{ coinsMissing }}</td>          
        </tr>
      </thead>
    </table>    
  </div>
</template>

<script>
import ModalAddPlayer from './ModalAddPlayer';

export default {
  name: 'CoinsTransfer',
  components: {
    ModalAddPlayer
  }, 
  
  data(){
    return {
      setCoins: '',
      coinsTransfered: 0,
      coinsMissing: 0,
      notification: {
        stateSuccess: false,
        stateError: false,
        stateWarn: false,
        title: 'Success',
        subtitle: 'Player was added to the list.'
      },
      players: []
    }
  },
  methods: {
    confirmCoins: function() {    
      document.getElementById("confirmCoins").disabled = true;  
      document.getElementById("editCoins").disabled = false;         
      document.getElementById("textCoins").disabled = true;
      this.calcCoins();
    },
    editCoins: function() {
      document.getElementById("confirmCoins").disabled = false;  
      document.getElementById("editCoins").disabled = true;         
      document.getElementById("textCoins").disabled = false;
    },
    removePlayer: function (index) {
      this.players.splice(index, 1); 
      this.calcCoins();
      return this.setNotification(1, 0, 0, 'Success', 'Player removed successfully of the list.'); 
    },
    addPlayer: function (player) {
      if( isNaN(this.coinsMissing) || this.coinsMissing < 10000) {
        return this.setNotification(0, 0, 1, 'Attention', 'You must enter how much coins you are going to transfer. It must be equal or higher than 10,000.');
      } else {
          try {
            this.players.push(player);
            this.calcCoins();     
          } catch (error) {
            console.log(error);
          }
          return this.setNotification(1, 0, 0, 'Success', 'Player added successfully into the list.'); 
      }
    },
    calcCoinsTransfered: function () {
      let value = 0;

      for (let count = 0; count < this.players.length; count++) {
        value += this.players[count].total;
      }
      return this.coinsTransfered = value;   
    },
    calcCoinsMissing: function () {
      this.coinsMissing = parseFloat(this.setCoins) - parseFloat(this.coinsTransfered);
      return console.log(parseFloat(this.coinsMissing));
    },
    calcCoins: function () {
      this.calcCoinsTransfered();
      this.calcCoinsMissing();
    },
    setNotification: function (stateSuccess, stateError, stateWarn, title_, subtitle_) {
      if (stateSuccess) {        
        this.notification = {stateSuccess: true, title: title_, subtitle: subtitle_};
        return setTimeout(() => this.notification.stateSuccess = false, 3000);
      }else if (stateError) {
         this.notification = {stateError: true, title: title_, subtitle: subtitle_};
         return setTimeout(() => this.notification.stateError = false, 3000);
      }else if (stateWarn) {
         this.notification = {stateWarn: true, title: title_, subtitle: subtitle_};
         return setTimeout(() => this.notification.stateWarn = false, 3000);
      }
    }
  }
}
</script>

<style scoped>
  table {
    margin-top: 25px;
    width: 100%;
    border-collapse: collapse;
    user-select: none;
    margin-bottom: 150px;
    transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  table td {
    font-size: 22px;
  }

  thead td {    
    border-bottom: 2px solid rgba(0,0,0,0.06);
    padding: 10px;
    font-weight: bolder;
  }

  .tableHead td:hover {
    background-color: rgba(0,0,0,0.03);
  }

  tbody td {
    padding: 15px 40px;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(0,0,0,0.05);
  }
  
  tbody tr:hover {
    background-color: rgba(0,120,250,0.2);
  }

  tbody tr:active {
    background-color: rgba(0,120,250,0.3);
  }

  .tableFooter {
    border-top: 2px solid rgba(0,0,0,0.06);
  }

  .tableFooter td {
    background-color: rgba(0,120,250,0.8);
    text-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  }

  .tableFooterText {
    text-align: center;
    color: #fff;
    font-size: 32px;
  }

  .playerName {
    text-align: left;
  }

  .groupButtons {
    display:  flex;
    justify-content: center;
  }

  .setCoins {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 25px;
    width: 50%;
  }

  .setCoins button {
    margin-left: 6px;
    flex-grow: 0.1;
  }

  input {
   border-radius: 8px;
   padding: 5px 0px;
   border: none;
   border-bottom: 2px solid rgba(0,0,0,0.06); 
   font-weight: bold;
   text-align: center;
   flex-grow: 2;
   font-size: 24px;
   transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   outline: none;
  }

  input:focus {
    border-bottom: 3px solid rgba(0,0,50,0.5);
  }

  .btn {
    outline: none;
    font-family: 'Roboto';
    font-weight: 300;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .btn:hover {
    box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
    transform: scale(1.035);
  }

  .btn:active {
    filter: brightness(1.5);
  }

  .btnSave, .btnEdit, .btnDelete {
    padding: 10px;
    color: #fff;
    font-size: 22px;
  }

  .btnSave {
    background-color: rgba(0,120,0,0.8);
  }

  .btnEdit {
    background-color: rgba(0,120,250,0.8);
  }

  .btnDelete {
    background-color: rgba(255,0,0,0.8);
  }

  .btn:disabled, .btn:disabled:hover {
    opacity: 0.4;
    background-color: gray;
    transform: scale(1);
  }

  .notification {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -5%);
    padding: 0px 40px;
    border-radius: 15px;
    background-color: rgba(0,0,50);
    border: 4px solid rgba(0,0,50);
    color: #fff;
    user-select: none;
    box-shadow: 0px 4px 3px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  .notification div {
    display: flex;
    text-align: left;
    flex-direction: column;
  }

  .notification .title {
    font-weight: bolder;
    letter-spacing: 1px;
  }

  .notification .subtitle {
    font-weight: 300;
    margin-top: -15px;
  }

  .notification .icon {
    height: 100%;
    position: absolute;
    padding: 0 20px;
    top: 0px;
    left: 0px;
    font-size: 32px;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .notificationSuccess .icon {    
    background-color: rgba(0,180,0,1);
  }

  .notificationError .icon {    
    background-color: rgba(180,0,0,1);
  }

  .notificationWarn .icon {    
    background-color: rgba(200,170,0,1);
  }

  .notification .spanIcon {
    width: 60px;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  
</style>
