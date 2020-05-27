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
        moneyManager.setMessage(success,"Баланс пополнен");
    } else {
        moneyManager.setMessage(!success,"Ошибка пополнения баланса");
    }
});
//конвертирование валют
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, ({success, data}) => {
    if (success) {
        ProfileWidget.showProfile(data);
        moneyManager.setMessage(success,"Конвертация выполнена");
    } else {
        moneyManager.setMessage(!success,"Ошибка конвертации");
    }
});
//перевод валюты
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, ({success, data}) => {
    if (success) {
        ProfileWidget.showProfile(data);
        moneyManager.setMessage(success,"Перевод выполнен");
    } else {
        moneyManager.setMessage(!success,"Ошибка перевода");
    }
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
        favoritesWidget.setMessage(success,"Пользователь добавлен");
    } else {
        favoritesWidget.setMessage(!success,"Ошибка добавления пользователя");
    }
});
//Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, ({success, data}) => {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
        favoritesWidget.setMessage(success,"Пользователь удален");
    } else {
        favoritesWidget.setMessage(!success,"Ошибка удаления пользователя");
    }
});