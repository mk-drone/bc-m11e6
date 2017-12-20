$(function() {

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    /*
    *   Card class definition
    */
    function Card(description){
        let self = this;

        this.id = randomString();
        this.description = description;
        this.$element = this.createCard();
    }

    /*
    *   Card class methods
    */
    Card.prototype = {
        removeCard : function () {
            this.$element.remove();
        }, 
        createCard : function (d) {            
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(this.description);
            var $cardDelete = $('<button>').addClass('btn-delete btn btn-danger').text('x');

            $cardDelete.click(() => {
                this.removeCard();
            });

            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }
    }

    /*
    *   Column class definition
    */
    function Column(name){
        let self = this;

        this.name = name;
        this.id = randomString();
        this.$element = this.createColumn();
    }

    /*
    *   Column class methods
    */
    Column.prototype = {
        createColumn : function () {
            
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(this.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete btn btn-danger').text('x');
            var $columnAddCard = $('<button>').addClass('add-card btn btn-primary').text('Add a card');

            $columnDelete.click(() => {
                this.removeColumn(); 
            });

            $columnAddCard.click(() => {
                this.addCard(new Card(prompt('Enter new name for the card')));
            });

            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);

            return $column;
        },

        addCard : function (card) {
            this.$element.children('ul').append(card.$element);
        },

        removeColumn : function () {
            this.$element.remove();
        }
    }

    /*
    * Board literal object
    */
    board = {
        name : 'Kanban board',

        addColumn: function(col) {
            this.$element.append(col.$element);
        },

        initSortable : () => {
            $('.column-card-list').sortable({
                connectWith: '.column-card-list',
                placeholder: 'card-placeholder'
            }).disableSelection();
        },
        $element : $('#board .column-container'),
    }

    $('.create-column').click(() => {
        board.addColumn(new Column(prompt('Enter column name')));
    });




    //end
    // CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);

})