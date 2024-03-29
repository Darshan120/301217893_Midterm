// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
   /*******
     * ADD CODE HERE *
     *******/
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.get('/add', (req, res, next) => {
  /*******
     * ADD CODE HERE *
     *******/
  let books = book({
  });
res.render('books/details', {title: 'Add new Book', books: books})    
});


// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // creating an object
  let new_book=book({
    "Title":req.body.title,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre
  });
  
  book.create(new_book,(err,new_book)=>{
    if(err)
    {
      console.log(err);
      res.render(err);
    }
    else{
      res.redirect('/books')
    }
  })
})


 


// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id=req.params.id;
  book.findById(id,(err,book_to_edit)=>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      res.render('books/details',{title:'book-edit',books:book_to_edit});
    }
  })

   
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  /*******
     * ADD CODE HERE *
     *******/

  let id=req.params.id;
  let book_edited=book({
    _id:id,
    "Title":req.body.title,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre

  })
  book.updateOne({_id:id},book_edited,(err)=>{
    if(err){
        console.log(err);
        res.end(err);

    }
    else {
    res.redirect('/books');
    }
  })


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
   /*******
     * ADD CODE HERE *
     *******/
 let id=req.params.id;
 book.remove({_id:id},(err)=>{
  if(err){
      console.log(err);
      res.end(err);

  }
  else {
  res.redirect('/books');
  }
})
   
});


module.exports = router;

	
	
	
