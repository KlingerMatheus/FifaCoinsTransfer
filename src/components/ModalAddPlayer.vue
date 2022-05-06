<template>
  <div>
    <button class="btn btnAddPlayer" @click="openModal()">
      <fa-icon icon="plus" /> Add Player
    </button>
    <div class="modalBackground" v-show="modalVisible">
      <div class="modal">
        <div class="header">
          <p class="title">Add Player</p>
          <p class="subtitle">Add a new player to the list</p>
          <button class="btnClose" @click="closeModal()">
            <fa-icon icon="times" />
          </button>
        </div>
        <hr />
        <div class="body">
          <div>
            <label for="playerName">Name:</label>
            <input
              type="text"
              name="playerName"
              v-model="playerName"
              class="textBox"
              autocomplete="off"
            />
          </div>
          <div>
            <label for="playerValue">His price on market:</label>
            <input
              type="number"
              name="playerValue"
              v-model="playerValue"
              class="textBox"
              autocomplete="off"
            />
          </div>
          <div>
            <label for="playerCost">Value payied on him:</label>
            <input
              type="number"
              name="playerCost"
              v-model="playerCost"
              class="textBox"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="footer">
          <button class="btn btnConfirmPlayer" v-on:click="savePlayer">
            <fa-icon icon="check" /> Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAddPlayer",
  data() {
    return (
      {
        playerName: "",
        playerValue: "",
        playerCost: "",
      },
      {
        modalVisible: false,
      }
    );
  },
  methods: {
    savePlayer: function () {
      let playerCost = parseFloat(this.playerCost);
      let playerValue = parseFloat(this.playerValue);

      let playerTax = playerCost * 0.05;
      let newPlayer = {
        name: this.playerName,
        value: this.playerValue,
        payiedValue: this.playerCost,
        tax: playerTax,
        total: playerCost - playerTax - playerValue,
      };
      this.closeModal();
      this.clearModal();
      return this.$emit("addNewPlayer", newPlayer);
    },
    closeModal: function () {
      return (this.modalVisible = false);
    },
    openModal: function () {
      return (this.modalVisible = true);
    },
    clearModal: function() {
      this.playerName = "";
      this.playerValue = "";
      this.playerCost = "";
    },
  },
};
</script>

<style scoped>
.modalBackground {
  position: fixed;
  display: block;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  user-select: none;
  transition: opacity 1s;
}

.modal {
  position: absolute;
  background: #fff;
  padding: 20px 80px 40px 80px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal .header {
  display: flex;
  flex-direction: column;
  justify-items: left;
  text-align: left;
}

.modal .header .subtitle {
  position: absolute;
  top: 75px;
  font-style: oblique;
  opacity: 0.6;
}

hr {
  margin-bottom: 25px;
  opacity: 0.3;
}

.modal .header .title {
  font-size: 32px;
  font-weight: bolder;
}

.modal .body {
  display: flex;
  flex-direction: column;
}

.modal .body div {
  display: flex;
  justify-content: left;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: baseline;
}

.modal .body input {
  flex-grow: 1;
  margin-left: 25px;
  padding: 10px;
  border-radius: 4px;
  border: 1px inset rgba(0, 0, 0, 0.2);
  font-size: 16px;
  outline: none;
  transition: 0.25 ease-in;
}

.modal .body input:hover {
  border-color: rgba(0, 120, 250, 0.5);
}

.modal .body input:focus {
  border-color: rgba(0, 120, 250, 0.5);
}

.btn {
  outline: none;
  font-family: "Roboto";
  font-weight: 300;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn:hover {
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  transform: scale(1.035);
}

.btn:active {
  filter: brightness(1.5);
}

.btnAddPlayer {
  padding: 8px 32px;
  font-size: 22px;
  color: #fff;
  background-color: rgba(0, 120, 250, 0.8);
  font-weight: bolder;
}

.btnAddPlayer:hover {
  background-color: rgba(0, 200, 250, 1);
  transform: scale(1.15);
}

.btnConfirmPlayer {
  padding: 8px 32px;
  font-size: 22px;
  color: #fff;
  background-color: rgba(0, 120, 250, 0.8);
  font-weight: bolder;
}

.btnConfirmPlayer:hover {
  background-color: rgba(0, 180, 0, 1);
  transform: scale(1.15);
}

.btnClose {
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 26px;
  color: rgba(0, 0, 0, 0.6);
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btnClose:hover {
  color: rgb(255, 30, 30);
  transform: scale(1.25);
}
</style>
