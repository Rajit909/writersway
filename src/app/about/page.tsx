'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Feather } from 'lucide-react';

const teamMembers = [
  { name: 'Jane Doe', role: 'Founder & Editor-in-Chief', image: 'https://picsum.photos/seed/jane/200/200', dataAiHint: 'woman portrait' },
  { name: 'John Smith', role: 'Lead Technology Writer', image: 'https://picsum.photos/seed/john/200/200', dataAiHint: 'man portrait' },
  { name: 'Emily White', role: 'Education & Learning Specialist', image: 'https://picsum.photos/seed/emily/200/200', dataAiHint: 'professional woman' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <Feather className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
          About Visionary Voice
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Exploring the future of technology, design, and education to inspire and inform the next generation of innovators.
        </p>
      </header>

      {/* Our Mission Section */}
      <section className="mb-16">
          <Card className="bg-secondary/30 border-border/30">
              <CardContent className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image 
                          src="https://picsum.photos/seed/mission/600/400" 
                          alt="Our Mission" 
                          fill
                          className="object-cover"
                          data-ai-hint="team working"
                      />
                  </div>
                  <div>
                      <Target className="w-10 h-10 mb-4 text-primary" />
                      <h2 className="text-3xl font-headline font-bold mb-4">Our Mission</h2>
                      <p className="text-muted-foreground text-lg">
                          Our mission is to provide insightful, high-quality content that demystifies complex topics in technology and education. We believe in the power of knowledge to transform lives and aim to be a trusted voice for curious minds everywhere. We are committed to fostering a community of learners and thinkers.
                      </p>
                  </div>
              </CardContent>
          </Card>
      </section>

      {/* Meet the Team Section */}
      <section>
        <div className="text-center mb-12">
            <Users className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet the Team</h2>
            <p className="text-lg text-muted-foreground mt-2">The creative minds behind the articles.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center bg-secondary/30 border-border/30 p-6">
                 <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                     <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        data-ai-hint={member.dataAiHint}
                    />
                 </div>
              <h3 className="text-xl font-headline font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
