let app = new Vue({
  el: "#app",
  data: {
    addedDate: '',
    addedDay: '',
    addedWakeUp: '',
    addedDoseTime: '',
    addedAmount: '',
    addedBedTime: '',
    addedCottonBalls: '',
    addedNote: '',
    addedTantrums: '',
    entries: {},
  },
  created() {
    console.log("created vue");
    this.getEntries();
    console.log("at this point we have entries");
    console.log(this.entries[0]);
  },
  methods: {
    async getEntries() {
      try {
        console.log("about to get the entries");
        let response = await axios.get("/api/entries");
        console.log("Here are the entries");
        console.log(response.data);
        this.entries = response.data;
        console.log(this.entries[0]);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addEntry() {
      try {
        let response = await axios.post("/api/entries", {
          date: this.addedDate,
          day: this.addedDay,
          wake: this.addedWakeUp,
          dose: this.addedDoseTime,
          amount: parseInt(this.addedAmount,10),
          bed: this.addedBedTime,
          cotton: parseInt(this.addedCottonBalls,10),
          note: this.addedNote,
          tantrums: parseInt(this.addedTantrums,10)
        });
        this.addedDate = '',
        this.addedDay = '',
        this.addedWakeUp = '',
        this.addedDoseTime = '',
        this.addedAmount = '',
        this.addedBedTime = '',
        this.addedCottonBalls = '',
        this.addedNote = '',
        this.addedTantrums = '',
        this.getEntries();
      } catch (error) {
        console.log(error);
      }
    },
    async editEntry(entry) {
      try {
        let response = await axios.put("/api/entries/" + entry._id, {
          date: entry.date,
          day: entry.day,
          wakeUp: entry.wakeUp,
          doseTime: entry.doseTime,
          amount: entry.amount,
          bedTime: entry.bedTime,
          cottonBalls: entry.cottonBalls,
          note: entry.note,
          tantrums: entry.tantrums,
        });
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEntry(entry) {
      try {
        let response = axios.delete("/api/entries/" + entry._id);
        this.getEntries();
      } catch (error) {
        console.log(error);
      }
    }
  }
});
