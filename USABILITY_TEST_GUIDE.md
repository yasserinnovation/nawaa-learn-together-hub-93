# Usability Testing Guide - Course Registration Flow

## 🎯 Test Objective
Verify that 5 users can find and register for a course without confusion.

## 📋 Test Scenario

**Task**: "Find a robotics course for a 12-year-old child and enroll them."

**Success Criteria**:
- ✅ User finds the Courses page within 30 seconds
- ✅ User filters or browses to find a suitable course
- ✅ User views course details
- ✅ User completes the enrollment form
- ✅ User receives confirmation
- **Time target**: 3-5 minutes total
- **Success rate target**: 5/5 users complete without assistance

## 🛤️ User Journey Map

### Path 1: Homepage → Courses (Recommended)
```
1. Homepage
   └─ Click "Start Free Course" (Hero CTA)
   └─ OR Click "Start Learning" (Features section)
   └─ OR Click "Courses" (Navigation menu)

2. Courses Page
   └─ Browse course cards OR use category filters
   └─ Click on course card to view details

3. Course Detail Page
   └─ Review course information
   └─ Click "Enroll Now" (Sticky sidebar or bottom CTA)

4. Enrollment Modal
   └─ Fill required fields (student name, parent name, email, phone)
   └─ Click "Submit Enrollment"

5. Success Confirmation
   └─ See confirmation message
   └─ Receive next steps
```

### Path 2: Assessment → Courses (Alternative)
```
1. Homepage
   └─ Click "Take the Assessment Now"
   
2. Complete 5-minute assessment

3. View recommended courses

4. Click on recommended course

5. [Same as Path 1 steps 3-5]
```

## 🧪 Test Protocol

### Pre-Test Briefing (2 minutes)
```
"We're testing how easy it is to find and enroll in a course. 
Please complete the following task as you normally would:

'Your 12-year-old child is interested in robotics. Find and enroll 
them in a suitable course on this platform.'

Please think aloud as you navigate. There are no wrong answers—
we're testing the website, not you."
```

### During Test (Observe & Record)
- ✅ Time to find Courses page
- ✅ Time to select a course
- ✅ Time to complete enrollment
- ✅ Number of clicks to complete task
- ✅ Moments of confusion or hesitation
- ✅ Error messages encountered
- ✅ Verbalized concerns or questions

### Post-Test Questions (5 minutes)
1. **Ease**: "On a scale of 1-5, how easy was it to find a course?"
2. **Confidence**: "How confident are you that your enrollment was successful?"
3. **Clarity**: "Was any part of the process confusing?"
4. **Expectations**: "Did anything surprise you or work differently than expected?"
5. **Improvements**: "What would make this process better?"

## ✅ Key Metrics to Track

| Metric | Target | Pass Threshold |
|--------|--------|----------------|
| Task completion rate | 100% (5/5) | ≥ 80% (4/5) |
| Average time to complete | 3-5 min | < 8 minutes |
| Unassisted completion | 100% (5/5) | ≥ 80% (4/5) |
| Average ease rating | ≥ 4.0/5 | ≥ 3.5/5 |
| Zero critical errors | 100% | ≥ 80% |

## 🔍 What to Look For

### Critical Issues (Must Fix)
- ❌ User cannot find the Courses page
- ❌ Enrollment button doesn't work
- ❌ Form validation blocks submission incorrectly
- ❌ No confirmation after enrollment
- ❌ Multiple error messages that confuse users

### Major Issues (Should Fix)
- ⚠️ User takes >2 attempts to find course
- ⚠️ Enrollment form requires >1 minute to complete
- ⚠️ User expresses uncertainty about success
- ⚠️ Error messages are unclear

### Minor Issues (Nice to Fix)
- 💡 User suggests improvement
- 💡 Slight hesitation at decision point
- 💡 Minor visual confusion

## 📊 Common Pain Points & Solutions

### Scenario 1: Can't Find Courses Page
**Symptoms**: User searches for "courses" or clicks wrong menu items
**Current Solutions**:
- Hero CTA: "Start Free Course"
- Navigation: "Courses" menu item
- Features section: "Start Learning" buttons
**If users still struggle**: Consider making Courses link more prominent

### Scenario 2: Unsure Which Course to Choose
**Symptoms**: User opens multiple courses, takes long time deciding
**Current Solutions**:
- Clear age ranges on each course card
- Category filters (Technology, Science, Math)
- Assessment CTA for personalized recommendations
**If users still struggle**: Add comparison feature or "Best for beginners" badges

### Scenario 3: Enrollment Form is Confusing
**Symptoms**: User leaves fields empty, questions required vs optional fields
**Current Solutions**:
- Clear required field markers (red asterisk)
- Inline validation with specific error messages
- Placeholder text with examples (you@example.com)
- Character count for optional notes field
**If users still struggle**: Add progress indicator, reduce required fields

### Scenario 4: Unclear After Submission
**Symptoms**: User asks "What happens next?" or tries to submit again
**Current Solutions**:
- Success modal with checkmark icon
- Confirmation message with next steps
- Email confirmation mentioned
- "Got It" button to close
**If users still struggle**: Add timeline graphic, send immediate email

## 🎬 Sample Test Script

### Welcome (1 minute)
```
"Thank you for participating in this usability test. We're testing 
a new educational platform to help kids learn STEM skills.

Today's test will take about 15 minutes. I'll give you a task, 
and I'd like you to complete it as you normally would. Please think 
aloud so I understand your thought process.

Remember: we're testing the website, not you. There are no wrong 
answers. If something doesn't work or is confusing, that's valuable 
feedback for us.

Do you have any questions before we begin?"
```

### Task Introduction (1 minute)
```
"Imagine your 12-year-old child has expressed interest in learning 
robotics. They want to build and program robots.

Your task is to:
1. Find a suitable robotics course on this platform
2. Enroll your child in that course

Please start from the homepage and complete this task. Think aloud 
as you go, telling me what you're looking for and why you're clicking 
on things.

Ready? Please begin."
```

### During Test (Silent Observation)
- Take notes on clicks, hesitations, errors
- Only intervene if completely stuck for >2 minutes
- Ask clarifying questions: "What are you looking for right now?"

### Wrap-up (2 minutes)
```
"Thank you! Let me ask you a few quick questions:

1. On a scale of 1-5, how easy was that task? (1 = very difficult, 5 = very easy)
2. How confident are you that the enrollment went through successfully?
3. Was there any point where you felt confused or unsure what to do?
4. If you could change one thing about this process, what would it be?

Thank you for your feedback! This is very helpful."
```

## 📈 Analysis Template

After completing all 5 tests, compile results:

```
=== USABILITY TEST RESULTS ===

Date: [DATE]
Participants: 5

=== COMPLETION METRICS ===
✓ Successful completions: [X]/5
✓ Average time: [X] minutes
✓ Unassisted completions: [X]/5
✓ Average ease rating: [X]/5

=== ISSUE FREQUENCY ===
Critical Issues:
- [Issue 1]: [X]/5 users affected
- [Issue 2]: [X]/5 users affected

Major Issues:
- [Issue 1]: [X]/5 users affected
- [Issue 2]: [X]/5 users affected

Minor Issues:
- [Issue 1]: [X]/5 users affected
- [Issue 2]: [X]/5 users affected

=== KEY FINDINGS ===
1. [Most common pain point]
2. [Second most common issue]
3. [Positive feedback patterns]

=== RECOMMENDED CHANGES ===
Priority 1 (Must Fix):
- [ ] [Issue to fix]
- [ ] [Issue to fix]

Priority 2 (Should Fix):
- [ ] [Issue to fix]
- [ ] [Issue to fix]

Priority 3 (Nice to Have):
- [ ] [Enhancement idea]
- [ ] [Enhancement idea]
```

## 🔧 Quick Fixes Before Testing

### Pre-Test Checklist
- [ ] Verify all navigation links work
- [ ] Test enrollment modal on desktop & mobile
- [ ] Check form validation messages are clear
- [ ] Confirm success message displays correctly
- [ ] Test with different screen sizes
- [ ] Clear browser cache before each test
- [ ] Prepare test data (test email, phone numbers)

### Test Environment Setup
- [ ] Use incognito/private browsing mode
- [ ] Have screen recording software ready
- [ ] Prepare note-taking template
- [ ] Test internet connection
- [ ] Close unnecessary browser tabs
- [ ] Disable browser extensions that might interfere

## 📱 Mobile Testing Considerations

If testing on mobile:
- **Navigation**: Ensure hamburger menu is obvious
- **Filters**: Check that category tabs are tap-able
- **Forms**: Verify keyboard doesn't obscure fields
- **Success**: Confirm modal fits on small screens
- **Touch Targets**: All buttons should be ≥44px

## 🎯 Success Indicators

**You'll know the test was successful if**:
- ✅ 5/5 or 4/5 users complete without major issues
- ✅ Average time is under 8 minutes
- ✅ Users report confidence in their enrollment
- ✅ No critical bugs encountered
- ✅ Ease rating averages ≥3.5/5

**You'll need to iterate if**:
- ❌ <80% completion rate (3 or fewer succeed)
- ❌ Users require verbal assistance
- ❌ Multiple users get stuck at the same point
- ❌ Average ease rating <3.0/5
- ❌ Users express confusion about what happens next

## 📚 Additional Resources

- [Nielsen Norman Group - Usability Testing 101](https://www.nngroup.com/articles/usability-testing-101/)
- [Steve Krug - Rocket Surgery Made Easy](https://sensible.com/rocket-surgery-made-easy/)
- [Usability.gov - Test Script Template](https://www.usability.gov/how-to-and-tools/resources/templates/usability-test-script-template.html)

---

**Last Updated**: 2025-01-04
**Test Version**: 1.0
