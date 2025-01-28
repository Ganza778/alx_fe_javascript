// Array to store quotes
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Category:</strong> ${quote.category}</p>
      <p>"${quote.text}"</p>
    `;
  }
  
  // Function to add a new quote dynamically
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    
    if (newQuoteText && newQuoteCategory) {
      // Add new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      // Clear the input fields
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
      
      alert("New quote added successfully!");
    } else {
      alert("Please fill in both fields to add a new quote.");
    }
  }
  
  // Function to create the form for adding a new quote
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    // Create input fields and button
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';
    
    
    const addQuoteButton = document.createElement('button');
    addQuoteButton.innerText = 'Add Quote';
    addQuoteButton.onclick = addQuote;
  
    // Append elements to form container
    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
    
    // Append form container to body (or any other desired container)
    document.body.appendChild(formContainer);
  }
  
  // Event listener for showing a new random quote
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Display an initial random quote when the page loads
  showRandomQuote();
  
  // Create the "Add Quote" form dynamically
  createAddQuoteForm();
  