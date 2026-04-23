package com.fms.tickets.service;

import com.fms.common.ApiResponse;
import com.fms.tickets.model.Comment;
import com.fms.tickets.repository.CommentRepository;
import com.fms.tickets.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;

    public ApiResponse<Comment> createComment(String ticketId, String authorEmail, String authorName, String content, String authorRole) {
        try {
            // Verify ticket exists
            if (!ticketRepository.existsById(ticketId)) {
                return ApiResponse.error("Ticket not found");
            }

            // Create new comment
            Comment comment = new Comment(ticketId, authorEmail, authorName, content, authorRole);
            Comment savedComment = commentRepository.save(comment);

            // Create notification for new comment (if not author's own ticket)
            // This could be enhanced to notify ticket owner/assigned technician

            return ApiResponse.success("Comment created successfully", savedComment);
        } catch (Exception e) {
            return ApiResponse.error("Failed to create comment: " + e.getMessage());
        }
    }

    public ApiResponse<List<Comment>> getCommentsByTicketId(String ticketId) {
        try {
            // Verify ticket exists
            if (!ticketRepository.existsById(ticketId)) {
                return ApiResponse.error("Ticket not found");
            }

            List<Comment> comments = commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
            return ApiResponse.success("Comments retrieved successfully", comments);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve comments: " + e.getMessage());
        }
    }

    public ApiResponse<Comment> updateComment(String commentId, String userEmail, String userRole, String newContent) {
        try {
            Optional<Comment> commentOpt = commentRepository.findById(commentId);
            if (commentOpt.isPresent()) {
                Comment comment = commentOpt.get();

                // Check if user can edit this comment
                if (!comment.canEdit(userEmail, userRole)) {
                    return ApiResponse.error("You don't have permission to edit this comment");
                }

                // Update comment content
                comment.updateContent(newContent);
                Comment updatedComment = commentRepository.save(comment);

                return ApiResponse.success("Comment updated successfully", updatedComment);
            } else {
                return ApiResponse.error("Comment not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to update comment: " + e.getMessage());
        }
    }

    public ApiResponse<Void> deleteComment(String commentId, String userEmail, String userRole) {
        try {
            Optional<Comment> commentOpt = commentRepository.findById(commentId);
            if (commentOpt.isPresent()) {
                Comment comment = commentOpt.get();

                // Check if user can delete this comment
                if (!comment.canDelete(userEmail, userRole)) {
                    return ApiResponse.error("You don't have permission to delete this comment");
                }

                commentRepository.deleteById(commentId);
                return ApiResponse.success("Comment deleted successfully");
            } else {
                return ApiResponse.error("Comment not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to delete comment: " + e.getMessage());
        }
    }

    public ApiResponse<Comment> getCommentById(String commentId) {
        try {
            Optional<Comment> comment = commentRepository.findById(commentId);
            if (comment.isPresent()) {
                return ApiResponse.success("Comment retrieved successfully", comment.get());
            } else {
                return ApiResponse.error("Comment not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve comment: " + e.getMessage());
        }
    }

    public void deleteCommentsByTicketId(String ticketId) {
        commentRepository.deleteByTicketId(ticketId);
    }

    public ApiResponse<List<Comment>> getCommentsByAuthor(String authorEmail) {
        try {
            List<Comment> comments = commentRepository.findByAuthorEmail(authorEmail);
            return ApiResponse.success("Author comments retrieved successfully", comments);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve author comments: " + e.getMessage());
        }
    }
}
