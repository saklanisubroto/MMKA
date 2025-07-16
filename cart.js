const products = {
  mango400: { name: 'Mango Pickle (400g)', price: 399 },
  mango1kg: { name: 'Mango Pickle (1 kg)', price: 899 },
  hing400: { name: 'Hing Mango Pickle (400g)', price: 599 },
  hing1kg: { name: 'Hing Mango Pickle (1 kg)', price: 1299 },
  chili400: { name: 'Chilli Pickle (400g)', price: 399 },
  chili1kg: { name: 'Chilli Pickle (1 kg)', price: 899 },
};
let cart = {};
function addToCart(key) {
  cart[key] = (cart[key] || 0) + 1;
  renderCart();
}
function removeFromCart(key) {
  if (!cart[key]) return;
  cart[key]--;
  if (cart[key] <= 0) delete cart[key];
  renderCart();
}
function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  let total = 0;
  for (let key in cart) {
    const qty = cart[key];
    const p = products[key];
    const sub = qty * p.price;
    total += sub;
    const div = document.createElement('div');
    div.innerHTML = \`
      <span>\${p.name}</span>
      <span>x\${qty}</span>
      <span>₹\${sub}</span>
      <button onclick="removeFromCart('\${key}')">–</button>
    \`;
    cartDiv.appendChild(div);
  }
  document.getElementById('total').innerText = total ? '₹' + total : 'Cart is empty';
  document.getElementById('orderBtn').disabled = total === 0;
}
function placeOrder() {
  const lines = ["Hi Moti Mausi, I'd like to place an order:"];
  let total = 0;
  for (let key in cart) {
    const qty = cart[key], p = products[key];
    lines.push(\`- \${p.name} x\${qty} (@₹\${p.price})\`);
    total += qty * p.price;
  }
  lines.push(\`Total: ₹\${total}\`);
  const text = encodeURIComponent(lines.join('\n'));
  window.open(\`https://wa.me/919971742193?text=\${text}\`, '_blank');
}