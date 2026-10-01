// Mock reviews, grouped by serviceId.
export const reviews = {
  s1: [
    { id: 'r1', author: 'Kabir R.', rating: 5, text: 'Explained calculus so much better than my textbook. Really patient.' },
    { id: 'r2', author: 'Meera J.', rating: 5, text: 'Helped me before my physics test, my grade actually went up.' },
    { id: 'r3', author: 'Arjun D.', rating: 4, text: 'Good sessions, sometimes hard to schedule on weekends.' },
  ],
  s2: [
    { id: 'r4', author: 'Fest Committee, DPS', rating: 5, text: 'Made our fest posters look genuinely professional. Fast too.' },
    { id: 'r5', author: 'Tanvi S.', rating: 4, text: 'Great designs, took a couple of rounds to get the colours right.' },
  ],
  s3: [
    { id: 'r6', author: 'Ananya P.', rating: 5, text: 'The keychain I ordered was even cuter in person. Great gift.' },
    { id: 'r7', author: 'Rohan K.', rating: 5, text: 'Ordered a custom toy for my niece, she loved it.' },
  ],
  s4: [
    { id: 'r8', author: 'Zara F.', rating: 5, text: 'My reels look so much cleaner now, quick turnaround too.' },
    { id: 'r9', author: 'Yash M.', rating: 4, text: 'Solid editing, would love a couple more style options.' },
  ],
  s5: [
    { id: 'r10', author: 'Local Bakery Owner', rating: 5, text: 'Got a simple site up for my shop in a week, easy to work with.' },
  ],
  s6: [
    { id: 'r11', author: 'Simran K.', rating: 5, text: 'Helped me organise my seminar slides so they actually made sense.' },
  ],
  s7: [
    { id: 'r12', author: 'Pooja N.', rating: 4, text: 'Nice simple decoration for my son\'s birthday, good value.' },
  ],
  s8: [
    { id: 'r13', author: 'Aman S.', rating: 5, text: 'Best eggless cake I\'ve had in the neighbourhood, will order again.' },
  ],
  s9: [
    { id: 'r14', author: 'Grandpa\'s Neighbour', rating: 5, text: 'Fixed our Wi-Fi and printer issue in one visit, very patient.' },
  ],
  s10: [
    { id: 'r15', author: 'Divya T.', rating: 4, text: 'Lovely portrait shots, edited photos took a bit longer than expected.' },
  ],
  s11: [
    { id: 'r16', author: 'Karan V.', rating: 5, text: 'Got a portrait done as a gift, came out beautifully.' },
  ],
  s12: [
    { id: 'r17', author: 'Neha R.', rating: 4, text: 'Assembled our wardrobe quickly and left the place tidy.' },
  ],
  s13: [
    { id: 'r18', author: 'Om P.', rating: 5, text: 'Caught mistakes I completely missed in my application essay.' },
  ],
  s14: [
    { id: 'r19', author: 'Ishita B.', rating: 5, text: 'The tote bag colours were exactly what I asked for.' },
  ],
}

export const getReviewsForService = (serviceId) => reviews[serviceId] || []
