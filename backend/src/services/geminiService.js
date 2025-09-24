const { GoogleGenerativeAI } = require('@google/generative-ai')

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('Gemini API key not provided. AI features will be disabled.')
      this.genAI = null
      return
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async generateProductDescription(productData) {
    if (!this.genAI) {
      throw new Error('Gemini AI not initialized')
    }

    try {
      const prompt = `
        Generate a compelling product description for a handmade product with the following details:
        
        Product Name: ${productData.name}
        Category: ${productData.category}
        Materials: ${productData.materials || 'Not specified'}
        Dimensions: ${productData.dimensions || 'Not specified'}
        Artisan: ${productData.artisan || 'Not specified'}
        
        Make it engaging, highlight the craftsmanship, uniqueness, and quality. Keep it between 100-200 words.
        Focus on the handmade aspect and traditional techniques.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate product description')
    }
  }

  async generateSellerProfile(sellerData) {
    if (!this.genAI) {
      throw new Error('Gemini AI not initialized')
    }

    try {
      const prompt = `
        Generate a professional artisan profile description based on:
        
        Name: ${sellerData.name}
        Craft: ${sellerData.productType}
        Experience: ${sellerData.experience}
        Location: ${sellerData.location || 'India'}
        
        Create a warm, authentic profile that highlights their expertise, passion for their craft,
        and commitment to quality. Keep it between 80-120 words.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate seller profile')
    }
  }

  async suggestCollaborations(sellerProfile, requirement) {
    if (!this.genAI) {
      return {
        suggestions: [],
        reasoning: 'AI service not available'
      }
    }

    try {
      const prompt = `
        A ${sellerProfile.craft} artisan needs collaboration for: "${requirement}"
        
        Suggest 3 types of artisans/skills that would complement this requirement.
        Provide reasoning for each suggestion.
        
        Format as JSON:
        {
          "suggestions": [
            {
              "skill": "skill name",
              "reason": "why this collaboration would be beneficial"
            }
          ]
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      try {
        return JSON.parse(text)
      } catch {
        // If JSON parsing fails, return a basic structure
        return {
          suggestions: [
            {
              skill: "General Artisan",
              reason: "Could provide complementary skills for your requirement"
            }
          ],
          reasoning: text
        }
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return {
        suggestions: [],
        reasoning: 'Failed to generate suggestions'
      }
    }
  }

  async generateProductTags(productData) {
    if (!this.genAI) {
      return []
    }

    try {
      const prompt = `
        Generate relevant tags for this handmade product:
        
        Name: ${productData.name}
        Description: ${productData.description}
        Category: ${productData.category}
        
        Provide 8-12 relevant tags that customers might search for.
        Include material, style, use case, and technique tags.
        Return as comma-separated values.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const tags = response.text().split(',').map(tag => tag.trim())
      
      return tags.slice(0, 12) // Limit to 12 tags
    } catch (error) {
      console.error('Gemini API error:', error)
      return []
    }
  }

  async moderateContent(content) {
    if (!this.genAI) {
      return { isAppropriate: true, reason: 'Moderation not available' }
    }

    try {
      const prompt = `
        Analyze this content for appropriateness in a handmade marketplace:

        "${content}"

        Check for:
        - Inappropriate language
        - Spam or promotional content
        - Misleading claims
        - Offensive material

        Respond with JSON:
        {
          "isAppropriate": boolean,
          "reason": "explanation if inappropriate"
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        return JSON.parse(text)
      } catch {
        return { isAppropriate: true, reason: 'Could not analyze content' }
      }
    } catch (error) {
      console.error('Content moderation error:', error)
      return { isAppropriate: true, reason: 'Moderation service unavailable' }
    }
  }

  async evaluateLoan(loanData) {
    if (!this.genAI) {
      throw new Error('Gemini AI not initialized')
    }

    try {
      const prompt = `
        You are an AI loan evaluator for artisans in a handmade marketplace. Analyze the following seller data and provide a comprehensive loan evaluation.

        Seller Data:
        - Seller ID: ${loanData.seller_id}
        - Craft Type: ${loanData.craft_type}
        - Transaction History:
          - Total Orders: ${loanData.transaction_history.total_orders}
          - Completed Orders: ${loanData.transaction_history.completed_orders}
          - Delayed Orders: ${loanData.transaction_history.delayed_orders}
          - Revenue Last 6 Months: ₹${loanData.transaction_history.revenue_last_6m}
        - Customer Reviews: ${loanData.reviews.join('; ')}
        - Number of Collaborations: ${loanData.collaborations}

        Based on this data, provide a loan evaluation in the following JSON format:
        {
          "seller_id": "${loanData.seller_id}",
          "risk_score": <number between 1-100, where lower is better>,
          "risk_tier": "<low|medium|high>",
          "loan_eligibility": <boolean>,
          "recommended_loan_amount": <number in rupees, based on revenue and risk>,
          "batch_size": <number, recommended production batch size>,
          "reasoning": [
            "<string: detailed reasoning point 1>",
            "<string: detailed reasoning point 2>",
            "<string: detailed reasoning point 3>",
            "<string: detailed reasoning point 4>"
          ]
        }

        Consider:
        - Completion rate = completed_orders / total_orders
        - Delay rate = delayed_orders / total_orders
        - Revenue stability
        - Review sentiment
        - Collaboration network strength
        - Craft type demand

        Risk tiers:
        - Low risk (score 1-30): High completion rate, low delays, good revenue, positive reviews
        - Medium risk (31-70): Moderate performance
        - High risk (71-100): Low completion rate, high delays, poor revenue, negative reviews

        Loan eligibility: true if risk_score <= 70
        Recommended amount: Based on 6-month revenue, risk tier, and craft type
        Batch size: Based on craft type and collaboration capacity
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Clean the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid AI response format')
      }

      const evaluation = JSON.parse(jsonMatch[0])

      // Validate the response structure
      if (!evaluation.seller_id || typeof evaluation.risk_score !== 'number' ||
          !['low', 'medium', 'high'].includes(evaluation.risk_tier) ||
          typeof evaluation.loan_eligibility !== 'boolean' ||
          typeof evaluation.recommended_loan_amount !== 'number' ||
          typeof evaluation.batch_size !== 'number' ||
          !Array.isArray(evaluation.reasoning)) {
        throw new Error('Invalid evaluation data structure')
      }

      return evaluation
    } catch (error) {
      console.error('Loan evaluation error:', error)
      throw new Error('Failed to evaluate loan application')
    }
  }
}

module.exports = new GeminiService()
