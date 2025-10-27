# 🎭 Playwright

Automação E2E completa para testes de e-commerce usando Playwright..

## 📋 Características

- ✅ Page Object Model (POM) bem estruturado
- ✅ Testes organizados por funcionalidade
- ✅ Suporte multi-browser (Chrome, Firefox, Safari)
- ✅ Testes responsivos (mobile e desktop)
- ✅ Relatórios HTML, JSON e JUnit
- ✅ Screenshots e vídeos em falhas
- ✅ CI/CD com GitHub Actions
- ✅ Retry automático em falhas
- ✅ Fixtures reutilizáveis

## 📁 Estrutura do Projeto

```
tests/
├── auth/
│   └── login.spec.js          # Testes de autenticação
├── shop/
│   └── shopping.spec.js       # Testes de compras
├── checkout/
│   └── checkout.spec.js       # Testes de checkout
├── e2e/
│   └── complete-flow.spec.js  # Fluxo completo E2E
├── pages/
│   ├── LoginPage.js           # Page Object - Login
│   ├── InventoryPage.js       # Page Object - Produtos
│   ├── CartPage.js            # Page Object - Carrinho
│   └── CheckoutPage.js        # Page Object - Checkout
└── fixtures/
    └── testData.js            # Dados de teste

playwright.config.js           # Configuração do Playwright
package.json                   # Dependências
```

## 🎯 Cenários de Teste

### Autenticação
- Login com credenciais válidas
- Login com credenciais inválidas
- Login de usuário bloqueado
- Validação de campos vazios
- Logout

### Shopping
- Visualização de produtos
- Adicionar produto ao carrinho
- Adicionar múltiplos produtos
- Remover produto do carrinho
- Ordenação por preço (crescente/decrescente)

### Checkout
- Fluxo completo de checkout
- Validação de informações obrigatórias
- Verificação de preço total
- Confirmação de pedido

### E2E
- Jornada completa: Login → Browse → Add to Cart → Checkout → Confirmation

## 📊 Relatórios

Os testes geram automaticamente:
- Relatório HTML interativo
- Relatório JSON para processamento
- Relatório JUnit para CI/CD
- Screenshots em falhas
- Vídeos em falhas
