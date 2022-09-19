(function renderPage() {
    const [accountHoldersList, setAccountHoldersList] = useState([])
    const [productList, setProductList] = useState([])

    const [history, setHistory] = useState([])
    
    window.addHistory=function(value){
        setHistory(prev=>[...prev,value])
    }
    window.newAccountHolder = function () {
        setAccountHoldersList(prev => (
            [...prev, { id:id(),name: formValues.newAccountHolder, balance: Number(formValues.newAccountBalance), buttonProduct:`<button onclick="selectCustomer()" type="button" class="btn btn-primary btn-sm">Products</button>`, buttonAccount:`<button type="button" class="btn btn-primary btn-sm">Account Activities</button>` }]
        ))
        addHistory({timestamp:new Date(),message:`${formValues.newAccountHolder} became a new customer with balance ${formValues.newAccountBalance}`})
        setFormElement(['newAccountHolder','newAccountBalance'])
    }

    window.newProduct = function () {
        setProductList(prev => (
            [...prev, { id:id(),productName: formValues.newProductName, productPrice: Number(formValues.newProductPrice), productQuantity: Number(formValues.newProductQuantity), buttonSelect:`<button type="button" class="btn btn-primary btn-sm">Sell</button>` }]
        ))
        addHistory({timestamp:new Date(),message:`${formValues.newProductName} became a new product with price ${formValues.newProductPrice}`})
        setFormElement(['newProductName','newProductPrice','newProductQuantity'])
    }

    window.selectCustomer=function(){

    }

    
    window.transactionalAction = function(){
        const copy = [...accountHoldersList()]
        const sender = copy.find(item=>Number(item.id)===Number(formValues.from))
        const receiver = copy.find(item=>Number(item.id)===Number(formValues.to))
        const amount = Number(formValues['transactional-amount'])
        if (sender===receiver){
            addHistory({
                timestamp:new Date(),
                message:'Sender and receiver is same person',
                
            })
            return
        }
        if (sender.balance<Number(amount)){
            addHistory({
                timestamp:new Date(),
                message:'Insufficient balance of sender',
            })
        }
        if (!sender && !receiver){
            addHistory({
                timestamp:new Date(),
                message:'Invalid sender and receiver',
                
            })
            return
        }
        if (!sender){
            addHistory({
                timestamp:new Date(),
                message:'Invalid sender',
               
            })
            return
        }
        if (!receiver){
            addHistory({
                timestamp:new Date(),
                message:'Invalid receiver',
                
            })
            return
        }
        sender.balance = sender.balance - amount
        receiver.balance = receiver.balance + amount
        addHistory({timestamp:new Date(),message:`${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}`}) 
        setAccountHoldersList(copy)
    }
    
    document.getElementById("account-holders-list").innerHTML = AccountHolderList({ list: accountHoldersList() })
    document.getElementById("product-list").innerHTML = ProductList({ list: productList() })

    document.getElementById("from-the-account-holder-list").innerHTML= AccountSelect({list: accountHoldersList(),default:"From", name:"from"})
    document.getElementById("send-to-account-holder-list").innerHTML= AccountSelect({list: accountHoldersList(),default:"To", name:"to"})
    document.getElementById("history-container").innerHTML= HistoryList({list: history()})
    
    window.renderFunction = renderPage
})()