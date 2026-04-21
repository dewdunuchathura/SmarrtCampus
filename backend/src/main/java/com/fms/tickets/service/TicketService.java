package com.fms.tickets.service;

import com.fms.common.ApiResponse;
import com.fms.tickets.model.Ticket;
import com.fms.tickets.repository.TicketRepository;
import com.fms.notifications.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final NotificationService notificationService;
    private final String UPLOAD_DIR = "uploads/tickets/";

    public ApiResponse<Ticket> createTicket(Ticket ticket, MultipartFile[] images) {
        try {
            // Handle image uploads
            if (images != null && images.length > 0) {
                List<String> imageUrls = uploadImages(images);
                ticket.setImageAttachments(imageUrls);
            }
            
            Ticket savedTicket = ticketRepository.save(ticket);
            
            // Create notification for ticket creation
            notificationService.createTicketCreatedNotification(
                savedTicket.getSubmittedBy(), 
                savedTicket.getId(), 
                savedTicket.getTitle()
            );
            
            return ApiResponse.success("Ticket created successfully", savedTicket);
        } catch (Exception e) {
            return ApiResponse.error("Failed to create ticket: " + e.getMessage());
        }
    }

    public ApiResponse<List<Ticket>> getAllTickets() {
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve tickets: " + e.getMessage());
        }
    }

    public ApiResponse<Ticket> getTicketById(String id) {
        try {
            Optional<Ticket> ticket = ticketRepository.findById(id);
            if (ticket.isPresent()) {
                return ApiResponse.success("Ticket retrieved successfully", ticket.get());
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve ticket: " + e.getMessage());
        }
    }

    public ApiResponse<Ticket> updateTicket(String id, Ticket ticketDetails) {
        try {
            Optional<Ticket> existingTicket = ticketRepository.findById(id);
            if (existingTicket.isPresent()) {
                Ticket ticket = existingTicket.get();
                ticket.setTitle(ticketDetails.getTitle());
                ticket.setDescription(ticketDetails.getDescription());
                ticket.setCategory(ticketDetails.getCategory());
                ticket.setPriority(ticketDetails.getPriority());
                ticket.setStatus(ticketDetails.getStatus());
                ticket.setAssignedTo(ticketDetails.getAssignedTo());
                ticket.updateStatus(ticketDetails.getStatus());
                
                Ticket updatedTicket = ticketRepository.save(ticket);
                return ApiResponse.success("Ticket updated successfully", updatedTicket);
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to update ticket: " + e.getMessage());
        }
    }

    public ApiResponse<Ticket> assignTicket(String id, String technicianEmail) {
        try {
            Optional<Ticket> ticket = ticketRepository.findById(id);
            if (ticket.isPresent()) {
                Ticket existingTicket = ticket.get();
                existingTicket.assignToTechnician(technicianEmail);
                Ticket savedTicket = ticketRepository.save(existingTicket);
                
                // Create notification for ticket assignment
                notificationService.createTicketAssignedNotification(
                    technicianEmail, 
                    savedTicket.getId(), 
                    savedTicket.getTitle(),
                    "System"
                );
                
                return ApiResponse.success("Ticket assigned successfully", savedTicket);
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to assign ticket: " + e.getMessage());
        }
    }

    public ApiResponse<Ticket> resolveTicket(String id, String resolutionNotes) {
        try {
            Optional<Ticket> ticket = ticketRepository.findById(id);
            if (ticket.isPresent()) {
                Ticket existingTicket = ticket.get();
                existingTicket.setResolutionNotes(resolutionNotes);
                Ticket savedTicket = ticketRepository.save(existingTicket);
                
                // Create notification for ticket resolution
                notificationService.createTicketResolvedNotification(
                    savedTicket.getSubmittedBy(), 
                    savedTicket.getId(), 
                    savedTicket.getTitle()
                );
                
                return ApiResponse.success("Ticket resolved successfully", savedTicket);
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to resolve ticket: " + e.getMessage());
        }
    }

    public ApiResponse<Ticket> rejectTicket(String id, String rejectionReason) {
        try {
            Optional<Ticket> ticket = ticketRepository.findById(id);
            if (ticket.isPresent()) {
                Ticket existingTicket = ticket.get();
                existingTicket.rejectTicket(rejectionReason);
                Ticket savedTicket = ticketRepository.save(existingTicket);
                
                // Create notification for ticket rejection
                notificationService.createTicketRejectedNotification(
                    savedTicket.getSubmittedBy(), 
                    savedTicket.getId(), 
                    savedTicket.getTitle()
                );
                
                return ApiResponse.success("Ticket rejected successfully", savedTicket);
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to reject ticket: " + e.getMessage());
        }
    }

    public ApiResponse<Void> deleteTicket(String id) {
        try {
            if (ticketRepository.existsById(id)) {
                ticketRepository.deleteById(id);
                return ApiResponse.success("Ticket deleted successfully");
            } else {
                return ApiResponse.error("Ticket not found");
            }
        } catch (Exception e) {
            return ApiResponse.error("Failed to delete ticket: " + e.getMessage());
        }
    }

    public ApiResponse<List<Ticket>> getTicketsByStatus(String status) {
        try {
            List<Ticket> tickets = ticketRepository.findByStatus(status);
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve tickets: " + e.getMessage());
        }
    }

    public ApiResponse<List<Ticket>> getTicketsByPriority(String priority) {
        try {
            List<Ticket> tickets = ticketRepository.findByPriority(priority);
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve tickets: " + e.getMessage());
        }
    }

    public ApiResponse<List<Ticket>> getTicketsByCategory(String category) {
        try {
            List<Ticket> tickets = ticketRepository.findByCategory(category);
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            return ApiResponse.error("Failed to retrieve tickets: " + e.getMessage());
        }
    }

    public ApiResponse<List<Ticket>> searchTickets(String keyword) {
        try {
            List<Ticket> tickets = ticketRepository.findByTitleContainingIgnoreCase(keyword);
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            return ApiResponse.error("Failed to search tickets: " + e.getMessage());
        }
    }

    private List<String> uploadImages(MultipartFile[] images) throws IOException {
        List<String> imageUrls = new java.util.ArrayList<>();
        
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        for (MultipartFile image : images) {
            if (image != null && !image.isEmpty()) {
                String originalFilename = image.getOriginalFilename();
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String newFilename = UUID.randomUUID().toString() + fileExtension;
                
                Path filePath = uploadPath.resolve(newFilename);
                Files.copy(image.getInputStream(), filePath);
                
                imageUrls.add("/uploads/tickets/" + newFilename);
            }
        }
        
        return imageUrls;
    }
}
