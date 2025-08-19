import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Music, Heart, Users, Target, Award, Mail, ArrowRight, DollarSign } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#688799] to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About Local Vocal
            </h1>

          </div>
        </div>
      </section>

      {/* About Local Vocal Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Empowering Local Voices
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Local Vocal is your gateway to the choral music community in Kansas City. We believe in enabling the lifelong musician by finding opportunities for involvement, expanding access to vocal education and training, and increasing audience interest across the wide array of local ensembles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                                      <div className="h-12 w-12 text-[#E86C4F] mx-auto mb-4 flex items-center justify-center text-4xl font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Directory</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Our extensive database includes Kansas City-based choral organizations of all genres and voicings.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                                      <div className="h-12 w-12 text-[#E86C4F] mx-auto mb-4 flex items-center justify-center text-4xl font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Direct Connections</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  Contact us for a personalized recommendation or to arrange an introduction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                                      <div className="h-12 w-12 text-[#E86C4F] mx-auto mb-4 flex items-center justify-center text-4xl font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community Building</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  More resources to come in the future - let us know what you'd like to see in Local Vocal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Our mission begins with equal access, because every ensemble deserves visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manual Curation</h3>
                    <p className="text-gray-600 dark:text-gray-200">
                      We collect and verify all our data manually, to maximize accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Sponsorships</h3>
                    <p className="text-gray-600 dark:text-gray-200">
                      No organizations receive preferential treatment or placement within the site.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Collaboration, not Competition</h3>
                    <p className="text-gray-600 dark:text-gray-200">
                      Music is not a zero-sum game - when we support each other, the entire community benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-primary-light to-primary p-8 text-white">
                <CardContent className="p-0">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-4">Our Mission</h4>
                    <p className="text-lg text-white/90 mb-6">
                      "To strengthen the Kansas City choral community by improving ensemble visibility, connecting singers to local opportunities, and creating more lifelong musicians."
                    </p>
                    <div className="text-center">
                      <div className="text-2xl font-bold">Our Goal: 0 voices without a home</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Card className="relative overflow-hidden p-0 text-white min-h-[500px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/kellyn-directing-choir.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/80 to-gold-dark/80" />
                <div className="absolute -bottom-2 left-0 right-0 p-6 text-center">
                  <div className="flex justify-center space-x-20">
                    <div className="text-center">
                      <p className="text-sm font-bold text-white drop-shadow-md">M.M. in Choral Conducting</p>
                      <p className="text-xs text-white/90 font-medium">UMKC Conservatory</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white drop-shadow-md">8+ years teaching</p>
                      <p className="text-xs text-white/90 font-medium">KS/MO Public Schools, Allegro KC</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h2>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Kellyn Button, Founder
              </h3>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Hi! I'm Kellyn, your choral concierge. I love to sing, and I love to work with people, so I've always felt most at home in the choir. I grew up in the Allegro KC program, followed in my parents' and grandparents' footsteps to become a music educator, and met my husband in choir at K-State. The choral community is such a caring, close-knit community, and I want to get as many people singing as I can - one step closer to world peace!
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
