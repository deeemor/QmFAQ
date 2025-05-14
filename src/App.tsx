import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FAQList } from './components/faq/FAQList';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LoadingScreen } from './components/common/LoadingScreen';
import { QuestionForm } from './components/faq/QuestionForm';
import { Contact } from './components/common/Contact';
import { useFAQs } from './hooks/useFAQs';
import { Hero } from './components/common/Hero';
import { Features } from './components/common/Features';
import { Stats } from './components/common/Stats';

function App() {
  const {
    faqs,
    isLoading,
    error,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useFAQs();

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 
                    text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <Hero />
<Features />
<Stats />        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                           dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                QmBase Knowledge Center
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Find answers to the most common questions about our services.
              </p>
            </div>
            
            <QuestionForm />
            
            <FAQList
              faqs={faqs}
              isLoading={isLoading}
              error={error}
              categories={categories}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="mt-16">
              <Contact />
            </div>
          </div>
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;