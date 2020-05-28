//Выход из личного кабинета
const logOut = new LogoutButton();
logOut.action = () => ApiConnector.logout(() => logOut.logoutClick(location.reload()));

//Получение информации о пользователе
ApiConnector.current(({success, data}) => {
    if(success) {
        ProfileWidget.showProfile(data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
const stocks = ApiConnector.getStocks(({success, data}) => {
    if (success) {ratesBoard.clearTable(); 
        ratesBoard.fillTable(data)
    }
});
setInterval(stocks, 10000);

//Операции с деньгами
const moneyManager = new MoneyManager();
//пополнение баланса
moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, ({success, data}) => {
     if (success) {
        ProfileWidget.showProfile(data);
    } 
    moneyManager.setMessage(success, data);
});
//конвертирование валют
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, ({success, data}) => {
    if (success) {
        ProfileWidget.showProfile(data);
    }
    moneyManager.setMessage(success, data);
});
//перевод валюты
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, ({success, data}) => {
    if (success) {
        ProfileWidget.showProfile(data);
    } 
    moneyManager.setMessage(success, data);
});

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
//запросите начальный список избранного
ApiConnector.getFavorites(({success, data}) => {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    } 
});
//Реализуйте добавления пользователя в список избранных
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, ({success, data}) => {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    } 
    favoritesWidget.setMessage(success, data);
});
//Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, ({success, data}) => {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    } 
    favoritesWidget.setMessage(success, data);
});