
interface TransactionI{
    sender: number,
    recipient: number,
    sum: number,
    date: Date,
    metadata?: Metadata[]
}

type BlockI = {
    pageName: string,
    seal: string
    transactions: TransactionI[]
} // 10 транзакций на блок

type Blockchain = BlockI[]

interface User{
    id: number,
    readonly initialBalance: number
    own_blockchain: Blockchain
}

type Metadata = {
    [S in string]: string
}

const testUsers: User[] = [];

for(let i = 0; i < 10; i++){
    testUsers.push({id: i, initialBalance: Math.floor(Math.random() * 99) + 1, own_blockchain: []});
}

class Transaction{
    sender: number = 0;
    recipient: number = 0;
    sum: number = 0;
    date: Date = new Date();
    metadata?:Metadata[] = [];

    constructor(data: TransactionI) {
        this.date = data.date;
        this.sum = data.sum;
        this.recipient = data.recipient;
        this.sender = data.sender;
        this.metadata = data.metadata;
    }
}

class Block{
    pageName: string = ''
    seal: string = ''
    transactions: TransactionI[] = [];
    constructor() {
    }

}
export class BlockChain{
    currentBlock: number = 0;
    currentPage: number = 0;
    users: User[] = [];
    transactionsPull : TransactionI[] = [];
    cancelledTransactions: TransactionI[] =  [];
    constructor() {
        for(let i = 0; i < 10; i++){
            this.users = testUsers;
        }
    }

    addTransaction = (data: TransactionI) => {
        const balanceMap: Record<number, number> = {}

        // this.users.forEach(user => {
        //     user.own_blockchain.forEach(bch => {
        //         bch.transactions.forEach(trans => {
        //             if(trans.sender === data.sender){
        //                 senderBalance = senderBalance - trans.sum;
        //             }
        //             if(trans.recipient === data.recipient){
        //                 senderBalance = senderBalance + trans.sum
        //             }
        //         })
        //     });
        //     console.log(senderBalance, user.id)
        //
        //
        // })
    }
}


