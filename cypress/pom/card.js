class Cards {
    master = {
      name: 'Master',
      cardNo: '5555444433331111',
      owner: 'Parita Patel',
      date: '03/30',
      year: '2030',
      code: '737',
    };
 
    amex = {
      name: 'Amex',
      cardNo: '370000000100018',
      owner: 'Parita Patel',
      date: '03/30',
      year: '2030',
      code: '7373',
    };

    getCard(){
        master = this.master;
        amex = this.amex;
    }

  }
  

  export default new Cards();