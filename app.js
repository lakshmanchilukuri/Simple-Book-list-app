document.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear();

    UI.displayBooks();
});

document.querySelector('#button').addEventListener('click', e => {
    console.log('js called');
    e.preventDefault();
    var title = document.querySelector('#title').value;
    var author = document.querySelector('#author').value;
    var isbn = document.querySelector('#isbn').value;

    validate = UI.validateFields(title, author, isbn);

    if (validate === true) {
        // document.querySelector('#display-table').style.display = 'table';
        console.log(JSON.stringify(new Book(title, author, isbn)));
        var book = new Book(title, author, isbn);
        Book.addBook(book);
        Storage.addtoLocalList(book);
        UI.clearFileds();

        var msg = document.querySelector('#msg');
        msg.textContent = 'Book Added';
        // msg.classList.remove('msg-error');
        msg.classList.add('msg-sucess');
    }
    else {
        var msg = document.querySelector('#msg');
        msg.textContent = 'Please Enter All Fields';
        // msg.classList.remove('msg-sucess');
        msg.classList.add('msg-error');
    }
    UI.clearmessage();
    UI.changeTableAppearance('table');
   // document.querySelector('#display-table').style.display = 'table';
});

document.querySelector('#display-table').addEventListener('click', e => {

    console.log(e.target);
    Book.deleteBook(e.target);

});


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    static addBook(b) {
        console.log(b);
        console.log(b.title);
       
        var row = document.createElement('tr');
        var titleDom = document.createElement('td');
        titleDom.innerHTML = b.title;
        row.appendChild(titleDom);
        var authDom = document.createElement('td');
        authDom.innerHTML = b.author;
        row.appendChild(authDom);
        var isbnDom = document.createElement('td');
        isbnDom.innerHTML = b.isbn;
        row.appendChild(isbnDom);

        var cancel = document.createElement('td');
        var btn = document.createElement('text-node');
        btn.innerHTML = 'X';
        cancel.appendChild(btn);
        btn.classList.add('cancel-btn');
        row.appendChild(cancel);
        document.querySelector('#body').appendChild(row);

        // var list = Storage.getLocalList();
         // list.push(b);
        // console.log(list);
        // Storage.updateLocalList('BookListl',list);


    }

    static deleteBook(element) {

        if (element.classList.contains('cancel-btn')) {
            element.parentElement.parentElement.remove();
            Storage.removefromLocalList(element.parentElement.parentElement.children.item(2).innerHTML);

        }
    }
}

class UI {

    static clearFileds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static changeTableAppearance(value){
        document.querySelector('#display-table').style.display = value;
    }

    static validateFields(title, author, isbn) {

        if (title === '' || author === '' || isbn === '') {
            return false;
        }
        else
            return true;

    }

    static clearmessage() {
        console.log('clear msg');
        window.setTimeout(function () {
            var msg = document.querySelector('#msg');
            // msg.parentElement.removeChild(msg);
            msg.innerHTML = '';
            msg.classList.remove('msg-error', 'msg-sucess');

        }, 1500);
    }

    static displayBooks() {
        var list = Storage.getLocalList()
     
        if (list.length !== 0)  {
            console.log('in ELSE');
            UI.changeTableAppearance('table');
            //document.querySelector('#display-table').style.display = 'table';

            for (var i in list) {
                console.log(list[i]);
                Book.addBook(list[i]);
            }

        }


    }


}

class Storage {
    static getLocalList() {
        console.log(localStorage.getItem('BookListl'));
        var list = JSON.parse(localStorage.getItem('BookListl'));
        if (list === null) {
            list = [];
        }

        return list;
    }

    static updateLocalList(item, value) {
        // localStorage.removeItem(item);
        localStorage.setItem(item, JSON.stringify(value));
    }

    static addtoLocalList(book) {
        var list = Storage.getLocalList();

        list.push(book);
       
        Storage.updateLocalList('BookListl', list);
    }

    static removefromLocalList(isbn) {
        const list = Storage.getLocalList();
        list.forEach((book, index) => {
            if (book.isbn === isbn) {
                list.splice(index, 1);
            }
        });

        Storage.updateLocalList('BookListl', list);

        if(list.length===0)
        UI.changeTableAppearance('none');

    }

}