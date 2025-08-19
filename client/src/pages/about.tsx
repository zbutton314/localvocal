import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Music, Heart, Users, Target, Award, Mail, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light dark:from-dark-card dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About Local Vocal
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Connecting voices, building community, and fostering the vibrant choral scene in Kansas City
            </p>
          </div>
        </div>
      </section>

      {/* About Local Vocal Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Local Vocal
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Local Vocal was born from a simple belief: everyone deserves to find their voice in a supportive, 
              musical community. We're dedicated to connecting singers of all levels with the perfect ensemble 
              that matches their interests, skill level, and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Music className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Directory</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our extensive database includes choral organizations and ensembles across the entire Kansas City metro area
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personal Connection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of personal relationships and direct connections between singers and ensembles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community Building</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Strengthening the choral community by making it easier for singers to find their perfect musical home
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
              We take a personalized, relationship-driven approach to connecting singers with ensembles. 
              It's not just about matching voices—it's about finding the right community for you.
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Targeted Matching</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We help you find ensembles that match your musical interests, skill level, and schedule requirements
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Direct Connections</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Connect directly with ensemble directors and members to learn more about their groups
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ongoing Support</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We're here to support you throughout your choral journey, from first contact to performance
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
                      "To connect every voice in Kansas City with the perfect choral community, 
                      fostering musical growth and building lasting relationships."
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-sm text-white/80">Ensembles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">1000+</div>
                        <div className="text-sm text-white/80">Singers Connected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">100%</div>
                        <div className="text-sm text-white/80">Personal Service</div>
                      </div>
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
              <Card className="bg-gradient-to-br from-gold to-gold-dark p-8 text-white">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Award className="h-20 w-20 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Kellyn Button</h4>
                    <p className="text-gold-light mb-4">Choral Concierge & Founder</p>
                    <p className="text-sm text-white/90 mb-6">
                      "I believe everyone deserves to find their voice in a supportive, 
                      musical community. Let me help you discover yours."
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">15+</div>
                        <div className="text-xs text-white/80">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">100+</div>
                        <div className="text-xs text-white/80">Ensembles Known</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h2>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Kellyn Button
              </h3>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Hi! I'm Kellyn, your personal guide to Kansas City's vibrant choral community. 
                  With over 15 years of experience in choral music and deep connections throughout 
                  the metro area, I'm passionate about helping singers find their perfect ensemble.
                </p>
                <p>
                  My journey in choral music began at a young age, and I've had the privilege of 
                  singing with and directing various ensembles across different genres and styles. 
                  This experience has given me unique insights into what makes each ensemble special 
                  and how to match singers with the right group.
                </p>
                <p>
                  I founded Local Vocal because I believe that finding the right choral community 
                  can be transformative. Whether you're a seasoned performer or just starting your 
                  choral journey, I'm here to help you find the perfect ensemble that matches your 
                  voice, interests, and schedule.
                </p>
                <p>
                  When I'm not connecting singers with ensembles, you can find me performing with 
                  local groups, attending concerts, or exploring Kansas City's rich musical scene.
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
