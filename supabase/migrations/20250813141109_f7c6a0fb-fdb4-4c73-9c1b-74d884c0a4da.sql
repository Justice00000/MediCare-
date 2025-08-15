-- Create call_offers table
CREATE TABLE public.call_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  caller_name TEXT NOT NULL,
  target_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  offer JSONB NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create call_answers table
CREATE TABLE public.call_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id UUID NOT NULL REFERENCES public.call_offers(id) ON DELETE CASCADE,
  answer JSONB NOT NULL,
  answerer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ice_candidates table
CREATE TABLE public.ice_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id UUID NOT NULL REFERENCES public.call_offers(id) ON DELETE CASCADE,
  candidate JSONB NOT NULL,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.call_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ice_candidates ENABLE ROW LEVEL SECURITY;

-- Create policies for call_offers
CREATE POLICY "Users can create call offers" 
ON public.call_offers 
FOR INSERT 
WITH CHECK (auth.uid() = caller_id);

CREATE POLICY "Users can view their call offers" 
ON public.call_offers 
FOR SELECT 
USING (auth.uid() = caller_id OR auth.uid() = target_id);

CREATE POLICY "Users can update their call offers" 
ON public.call_offers 
FOR UPDATE 
USING (auth.uid() = caller_id OR auth.uid() = target_id);

-- Create policies for call_answers
CREATE POLICY "Users can create call answers" 
ON public.call_answers 
FOR INSERT 
WITH CHECK (auth.uid() = answerer_id);

CREATE POLICY "Users can view call answers for their calls" 
ON public.call_answers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.call_offers 
    WHERE id = call_id 
    AND (caller_id = auth.uid() OR target_id = auth.uid())
  )
);

-- Create policies for ice_candidates
CREATE POLICY "Users can create ice candidates" 
ON public.ice_candidates 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view ice candidates for their calls" 
ON public.ice_candidates 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.call_offers 
    WHERE id = call_id 
    AND (caller_id = auth.uid() OR target_id = auth.uid())
  )
);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_call_offers_updated_at
BEFORE UPDATE ON public.call_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_call_offers_target_id ON public.call_offers(target_id);
CREATE INDEX idx_call_offers_caller_id ON public.call_offers(caller_id);
CREATE INDEX idx_call_answers_call_id ON public.call_answers(call_id);
CREATE INDEX idx_ice_candidates_call_id ON public.ice_candidates(call_id);